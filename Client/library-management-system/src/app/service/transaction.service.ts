import { Injectable } from '@angular/core';
import { Transaction } from '../model/Transaction';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  baseUrl
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization':  sessionStorage.getItem('token'),
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient) { 
    this.baseUrl=AppConstants.baseURL+"8081/transaction";
  }

  fetchAllTransactions(){
    return this.http.get<Transaction[]>(this.baseUrl);
  }

  getTransactionByUserId(userId){
    return this.http.get<Transaction[]>(this.baseUrl);
  }

  save(data){
    return this.http.post<Transaction>(this.baseUrl,data,this.httpOptions);
  }
}
