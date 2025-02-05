import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private BASE_URI: string;

  constructor(private http: HttpClient, private apiService: ApiService) {
    this.BASE_URI = this.apiService.getApiUrl();
  }
  bookTicket(bookingData: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URI}/booking`, bookingData);
  }
  getBookingById(bookingId: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URI}/booking/${bookingId}`);
  }

  // Get all bookings by user
  getUserBookings(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URI}/booking/user/${userId}`);
  }
}
