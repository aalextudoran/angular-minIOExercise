// src/app/components/navbar/navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog'; 
import { MinioObjectsService } from '../../services/minio-objects.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DownloadLogsService } from '../../services/download-logs.service'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchQuery: string = '';
  filteredObjects: string[] = [];
  private searchTerms = new Subject<string>();
  fileInput: HTMLInputElement | null = null;

  constructor(
    private router: Router,
    private minioObjectsService: MinioObjectsService,
    private dialog: MatDialog,
    private downloadLogsService: DownloadLogsService 
  ) {}

  ngOnInit(): void {
    this.minioObjectsService.getObjects().subscribe(
      (data: string[]) => {
        this.filteredObjects = data;
      },
      (error) => {
        console.error('Error fetching objects:', error);
        this.filteredObjects = []; 
      }
    );

    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (term.trim() === '') {
          return this.minioObjectsService.getObjects();
        } else {
          return this.minioObjectsService.getObjects(term);
        }
      })
    ).subscribe(
      (data: string[]) => {
        this.filteredObjects = data;
      },
      (error) => {
        console.error('Error fetching objects:', error);
        this.filteredObjects = []; 
      }
    );
  }

  onSearch(searchValue: string): void {
    const trimmedSearchValue = searchValue.trim();
    this.searchTerms.next(trimmedSearchValue);
    this.router.navigateByUrl(`/search/${trimmedSearchValue}`);

    // Loghează termenul de căutare
    this.minioObjectsService.logSearch(trimmedSearchValue).subscribe({
      next: () => {
        console.log(`Search query "${trimmedSearchValue}" logged successfully.`);
      },
      error: (error) => {
        console.error('Error logging search query:', error);
      }
    });
  }

  goToSearchResults(): void {
    this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
  }

  onDownload(objectName: string): void {
    console.log(`Attempting to download: ${objectName}`);
    this.minioObjectsService.logDownload(objectName).subscribe({
    next: () => {
      console.log(`logged successfully.`);
    },
    error: (error) => {
      console.error('Error logging search query:', error);
    }
  });
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { name: objectName }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {        
        this.downloadObject(objectName);
      } else {
        console.log('Descărcarea a fost anulată de utilizator');
      }
    });
  }
  

  downloadObject(object: string): void {
    this.minioObjectsService.downloadObject(object).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = object;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading object:', error);
      }
    );
  }

  triggerFileInput(): void {
    if (this.fileInput) {
      this.fileInput.click(); 
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      
      this.minioObjectsService.uploadObject(file).subscribe(
        (response) => {
          console.log('File uploaded successfully', response);
          window.location.reload()
         },
        (error) => {
          console.error('Error uploading file', error);
          window.location.reload()
          // Handle error response if needed
        });
    }
  }

  sortObjects(order: 'asc' | 'desc'): void {
    this.minioObjectsService.sortObjects(order).subscribe(
      (data: string[]) => {
        this.filteredObjects = data;
      },
      (error) => {
        console.error('Error sorting objects:', error);
        this.filteredObjects = []; 
      }
    );
  }
}
