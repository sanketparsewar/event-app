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
  getEventsByCity(city:string):Observable<Ievent[]>{
    return this.http.get<Ievent[]>(`${this.BASE_URI}/event/city/${city}`);
  }
  getFilteredEvents(filter: { selectedCity?: string; selectedCategoryId?: string }) {
    let params: any = {};
  
    if (filter.selectedCity) params.city = filter.selectedCity;
    if (filter.selectedCategoryId) params.categoryId = filter.selectedCategoryId; // Only send if it's not empty
  
    return this.http.get<Ievent[]>(`${this.BASE_URI}/event/filter`,{ params });
  }
  
  // getFilteredEvents(city?: string, categoryId?: string) {
  //   let params: any = {};
  //   if (city) params.city = city;
  //   if (categoryId && categoryId !== "null") params.categoryId = categoryId; // Avoid passing "null" as a string
  
  //   return this.http.get<Ievent[]>(`${this.BASE_URI}/event/filter`, { params });
  // }
  
}
