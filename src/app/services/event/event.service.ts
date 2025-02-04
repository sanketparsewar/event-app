import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ievent } from 'src/app/interfaces/event.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private _data: Ievent[] = [];  
  private API_URI = 'http://localhost:8000/api';
  // private API_URI = 'https://event-app-backend-ntri.onrender.com/api';

  constructor(private http: HttpClient) {}
  getEvents(): Observable<Ievent[]> {
    return this.http.get<Ievent[]>(`${this.API_URI}/event`);
  }

  getEventById(id: string): Observable<Ievent> {
    return this.http.get<Ievent>(`${this.API_URI}/event/${id}`);
  }

  //  // Getter for event data
  //  get data(): Ievent[] {
  //   return this._data;
  // }

  // // Setter for event data
  // set data(events: Ievent[]) {
  //   this._data = events;
  // }
}
