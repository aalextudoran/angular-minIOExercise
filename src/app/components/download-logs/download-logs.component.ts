import { Component, OnInit } from '@angular/core';
import { DownloadLogs } from '../../common/download-logs';
import { DownloadLogsService } from '../../services/download-logs.service';

@Component({
  selector: 'app-download-logs',
  templateUrl: './download-logs.component.html',
  styleUrls: ['./download-logs.component.css']  // Dacă ai fișiere CSS
})
export class DownloadLogsComponent implements OnInit {
  downloadLogs: DownloadLogs[] = [];

  constructor(private downloadLogsService: DownloadLogsService) {}

  ngOnInit(): void {}

  // Metoda pentru a încărca logurile de descărcare
  loadDownloadLogs(): void {
    this.downloadLogsService.getDownloadLogs().subscribe(
      (logs) => {
        this.downloadLogs = logs;
      },
      (error) => {
        console.error('Error loading download logs:', error);
      }
    );
  }

  // Metoda pentru a descărca fișierul
  downloadFile(objectName: string): void {
    this.downloadLogsService.getDownloadLogsById(objectName).subscribe(
      (log) => {
        // Logica pentru descărcarea fișierului
        const url = `http://localhost:8080/api/minio/objects/download/${objectName}`;
        window.open(url);
      },
      (error) => {
        console.error('Error downloading file:', error);
      }
    );
  }
}
