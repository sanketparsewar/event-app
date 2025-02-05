import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private readonly API_URI = 'http://localhost:8000/api';
  private API_URI = 'https://event-app-backend-ntri.onrender.com/api';

  constructor() {}

  getApiUrl(): string {
    return this.API_URI;
  }
}
