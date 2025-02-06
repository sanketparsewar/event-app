import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ievent } from 'src/app/interfaces/event.interface';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private BASE_URI: string;

  constructor(private http: HttpClient, private apiService: ApiService) {
    this.BASE_URI = this.apiService.getApiUrl();
  }
  getEvents(): Observable<Ievent[]> {
    return this.http.get<Ievent[]>(`${this.BASE_URI}/event`);
  }

  getEventById(id: string): Observable<Ievent> {
    return this.http.get<Ievent>(`${this.BASE_URI}/event/${id}`);
  }

  getEventsByCategory(categoryId: string): Observable<Ievent[]> {
    return this.http.get<Ievent[]>(`${this.BASE_URI}/event/category/${categoryId}`);
  }
}
