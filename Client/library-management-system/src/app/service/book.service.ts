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
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization':  sessionStorage.getItem('token'),
      'Content-Type': 'application/json'
    })
  };
  constructor(private http : HttpClient) {
    this.baseUrl = AppConstants.baseURLBook+"book"
   }

  save(formData : FormData):Observable<any>{
    console.log("book service"+formData)
    return this.http.post(this.baseUrl,formData);
  }

  fetchAllBooks(){
    return this.http.get<Book[]>(this.baseUrl,this.httpOptions);
  }
}
