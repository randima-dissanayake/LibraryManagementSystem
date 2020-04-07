import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../model/Book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = "http://192.168.8.102:8080/book"
  constructor(private http : HttpClient) { }

  save(formData : FormData):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : sessionStorage.getItem('token'),
      'Access-Control-Allow-Origin': '*'
    });
    console.log("book service"+formData)
    return this.http.post(this.baseUrl,formData,{headers:headers});
  }

  fetchAllBooks(){
    return this.http.get<Book[]>(this.baseUrl);
  }
}
