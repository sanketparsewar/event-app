import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icategory } from 'src/app/interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
//  private API_URI = 'http://localhost:8000/api';
 private API_URI = 'https://event-app-backend-ntri.onrender.com/api';

  constructor(private http: HttpClient) {}
  getCategories(): Observable<Icategory[]> {
    return this.http.get<Icategory[]>(`${this.API_URI}/category`);
  }

  getCategoryById(id: string): Observable<Icategory> {
    return this.http.get<Icategory>(`${this.API_URI}/category/${id}`);
  }
}
