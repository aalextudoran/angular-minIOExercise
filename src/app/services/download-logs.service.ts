import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DownloadLogs } from '../common/download-logs';
//import { Type } from '../common/type';

@Injectable({
  providedIn: 'root',
})
export class DownloadLogsService {
  private baseUrl = 'http://localhost:8080/api/minio/objects/download';

  constructor(private http: HttpClient) {}

  getDownloadLogs(): Observable<DownloadLogs[]> {
    return this.http.get<DownloadLogs[]>(this.baseUrl);
  }
  getDownloadLogsById(objectName: string): Observable<DownloadLogs> {
    return this.http.get<DownloadLogs>(`${this.baseUrl}/${objectName}`);
  }
}

interface DownloadResponse {
  message: string;
}