import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../model/Book';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl
  constructor(private http : HttpClient) {
    this.baseUrl = AppConstants.baseURL+"8082/"
   }

  save(formData : FormData):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : sessionStorage.getItem('token'),
      'Access-Control-Allow-Origin': '*'
    });
    console.log("book service"+formData)
    return this.http.post(this.baseUrl+"book",formData,{headers:headers});
  }

  fetchAllBooks(){
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : sessionStorage.getItem('token'),
      'Access-Control-Allow-Origin': '*'
    });
    
    return this.http.get<Book[]>(this.baseUrl+"book",{headers:headers});
  }
}
