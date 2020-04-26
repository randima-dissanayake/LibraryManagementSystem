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
    this.baseUrl=AppConstants.baseURLTransaction+"transaction";
  }

  fetchAllTransactions(){
    return this.http.get<any[]>(this.baseUrl);
  }

  getTransactionByUniversityId(uId){
    return this.http.get<Transaction[]>(this.baseUrl+"/user/"+uId,this.httpOptions);
  }

  save(data){
    return this.http.post<Transaction>(this.baseUrl,data,this.httpOptions);
  }

  renew(id){
    return this.http.get<Transaction>(this.baseUrl+"/renew/"+id,this.httpOptions);
  }

  return(id){
    return this.http.get<Transaction>(this.baseUrl+"/return/"+id,this.httpOptions);
  }

  fetchAllFinesNotReturned(){
    return this.http.get<Transaction[]>(this.baseUrl+"/fine/notreturned",this.httpOptions)
  }

}
