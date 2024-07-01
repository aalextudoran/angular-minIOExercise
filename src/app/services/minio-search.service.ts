import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MinioSearchService {

  private apiUrl = '/api'; 

  constructor(private http: HttpClient) { }

  searchObjects(query: string): Observable<any> {
    const params = new HttpParams().set('query', query);
    return this.http.get<any>(`${this.apiUrl}/minio/objects`, { params });
  }

  getObjectDetails(objectName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/minio/objects/${objectName}`);
  }

  downloadObject(objectName: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/minio/objects/${objectName}/download`, { responseType: 'blob' });
  }
  
}
