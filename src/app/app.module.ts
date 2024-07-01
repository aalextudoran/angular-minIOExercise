// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; 
import { MinioObjectsService } from './services/minio-objects.service';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DownloadLogsService } from './services/download-logs.service'; 
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component'; 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConfirmDialogComponent, 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    MatDialogModule, 
    
    
  ],
  providers: [MinioObjectsService],
  bootstrap: [AppComponent],
 // entryComponents: [ConfirmDialogComponent] 
})
export class AppModule { }
