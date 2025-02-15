import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private BASE_URI: string;
  
    constructor(private http: HttpClient, private apiService: ApiService) {
      // this.BASE_URI = this.apiService.getApiUrl();
      this.BASE_URI = environment.apiUrl;
    }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(`${this.BASE_URI}/upload`, formData, {
      headers: new HttpHeaders(),
    });
  }
}
