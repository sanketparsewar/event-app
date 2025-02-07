import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private BASE_URI: string;

  constructor(private http: HttpClient, private apiService: ApiService) {
    this.BASE_URI = this.apiService.getApiUrl();
  }

  getTransactionById(transactionId: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URI}/transaction/${transactionId}`);
  }
  createTransaction(transactionData: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URI}/transaction`, transactionData);
  }
  deleteTransaction(transactionId: string): Observable<any> {
    return this.http.delete(`${this.BASE_URI}/transaction/${transactionId}`);
  }
}
