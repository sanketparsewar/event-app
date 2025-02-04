import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private API_URI = 'http://localhost:8000/api';
  // private API_URI = 'https://event-app-backend-ntri.onrender.com/api';

  constructor(private http: HttpClient) {}
  getShowsByEvent(eventId:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URI}/show/event/${eventId}`);
  }


}
