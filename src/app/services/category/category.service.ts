import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icategory } from 'src/app/interfaces/category.interface';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private BASE_URI: string;

  constructor(private http: HttpClient, private apiService: ApiService) {
    this.BASE_URI = this.apiService.getApiUrl();
  }
  getCategories(): Observable<Icategory[]> {
    return this.http.get<Icategory[]>(`${this.BASE_URI}/category`);
  }

  getCategoryById(id: string): Observable<Icategory> {
    return this.http.get<Icategory>(`${this.BASE_URI}/category/${id}`);
  }
}
