import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_URI: string;

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router
  ) {
    this.BASE_URI = this.apiService.getApiUrl();
  }
  isAuthenticated = false;

  // Register User
  register(userData: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.BASE_URI}/auth/register`, userData, {
      withCredentials: true,
    });
  }

  // Login User
  login(userData: { email: string; password: string }): Observable<any> {
    return this.http
      .post(`${this.BASE_URI}/auth/login`, userData, { withCredentials: true })
      .pipe(
        tap((response) => {
          this.isAuthenticated = true;
        })
      );
  }

  // Logout User
  logout(): void {
    this.http
      .post(`${this.BASE_URI}/auth/logout`, {}, { withCredentials: true })
      .subscribe(() => {
        this.isAuthenticated = false;
        this.router.navigate(['/home']); // Redirect to login after logout
      });
  }

  // Check if User is Logged In (Call on App Load)
  // getLoggedUser(): void {
  //   this.http.get(`${this.BASE_URI}/profile`, { withCredentials: true }).subscribe({
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
    return this.http.get(`${this.BASE_URI}/auth/profile`, {
      withCredentials: true,
    });
  }

  updateUser(user: any, userId: string): Observable<any> {
    return this.http.put(`${this.BASE_URI}/user/${userId}`, user);
  }

  deleteUser(): Observable<any> {
    return this.http.delete(`${this.BASE_URI}/user`);
  }
}
