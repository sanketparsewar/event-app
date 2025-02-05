import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  private BASE_URI: string;

  constructor(private http: HttpClient, private apiService: ApiService) {
    this.BASE_URI = this.apiService.getApiUrl();
  }

  getShowsByEvent(eventId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URI}/show/event/${eventId}`);
  }
}
