import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../model/Book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http : HttpClient) { }

  save(formData : FormData):Observable<any>{
    console.log("book service"+formData)
    return this.http.post("http://localhost:8080/book",formData);
  }

  fetchAllBooks(){
    return this.http.get<Book[]>("http://localhost:8080/book");
  }
}
