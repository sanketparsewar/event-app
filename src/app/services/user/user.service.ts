import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = 'http://localhost:8000/api/auth'; // Update with your backend URL
  isAuthenticated = false; // Tracks user authentication status

  constructor(private http: HttpClient, private router: Router) {}

  // Register User
  register(userData: { name: string;phone:string, email: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, userData, { withCredentials: true });
  }

  // Login User
  login(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, userData, { withCredentials: true }).pipe(
      tap(() => {
        this.isAuthenticated = true;
      })
    );
  }

  // Logout User
  logout(): void {
    this.http.post(`${this.API_URL}/logout`, {}, { withCredentials: true }).subscribe(() => {
      this.isAuthenticated = false;
      this.router.navigate(['/home']); // Redirect to login after logout
    });
  }

  // Check if User is Logged In (Call on App Load)
  // getLoggedUser(): void {
  //   this.http.get(`${this.API_URL}/profile`, { withCredentials: true }).subscribe({
  //     next: (response) => {
  //       console.log('User is authenticated:', response);
  //       this.isAuthenticated = true;
  //     },
  //     error: () => {
  //       console.log('User is not authenticated, redirecting to login...');
  //       this.isAuthenticated = false;
  //       this.router.navigate(['/login']);
  //     },
  //   });
  // }
  getLoggedUser(): Observable<any> {
    return this.http.get(`${this.API_URL}/profile`, { withCredentials: true });
  }
}
