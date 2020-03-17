import { Injectable } from '@angular/core';
import { Transaction } from '../model/Transaction';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  fetchAllTransactions(){
    return this.http.get<Transaction[]>("http://localhost:8081/transaction");
  }
}
