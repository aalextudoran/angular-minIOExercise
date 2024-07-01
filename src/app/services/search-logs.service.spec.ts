// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { SearchLogs } from '../common/search-logs';

// @Injectable({
//   providedIn: 'root',
// })
// export class SearchLogsService {
//   private baseUrl = 'http://localhost:8080/api/minio/objects/Search';

//   constructor(private http: HttpClient) {}

//   getSearchLogs(): Observable<SearchLogs[]> {
//     return this.http.get<SearchLogs[]>(this.baseUrl);
//   }
//   getSearchLogsById(objectName: string): Observable<SearchLogs> {
//     return this.http.get<SearchLogs>(`${this.baseUrl}/${objectName}`);
//   }d
// }