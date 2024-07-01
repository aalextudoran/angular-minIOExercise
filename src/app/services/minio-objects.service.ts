// src/app/services/minio-objects.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MinioObjectsService {
  private baseUrl = 'http://localhost:8080/api/minio/objects';

  constructor(private http: HttpClient) {}

  getObjects(query?: string): Observable<string[]> {
    const url = query ? `${this.baseUrl}?continue=${query}` : this.baseUrl;
    return this.http.get<string[]>(url);
  }

  downloadObject(objectName: string): Observable<any> {
    const url = `${this.baseUrl}/download/${objectName}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  sortObjects(order: 'asc' | 'desc'): Observable<string[]> {
    const url = `${this.baseUrl}/sort`;
    return this.http.post<string[]>(url, { order });
  }

  logSearch(searchTerm: string): Observable<any> {
    const url = `${this.baseUrl}/search-log`;
    const body = { searchTerm: searchTerm }; 
    return this.http.post(url, body);
  }

  logDownload(objectName: string): Observable<any> {
    const url = `http://localhost:8080/api/minio/objects/download-log`;
    const body = { objectName: objectName }; 
    return this.http.post(url, body);
  }
  
  uploadObject(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }
}
