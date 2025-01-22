import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ievent } from 'src/app/interfaces/event.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private API_URI = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}
  getEvents(): Observable<Ievent[]> {
    return this.http.get<Ievent[]>(`${this.API_URI}/event`);
  }

  getEventById(id: string): Observable<Ievent> {
    return this.http.get<Ievent>(`${this.API_URI}/event/${id}`);
  }
}
