import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../model/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http : HttpClient) { }

  save(data){
    console.log("book service"+data)
    return this.http.post<Book>("http://localhost:8080/book",data);
  }

  fetchAllBooks(){
    return this.http.get<Book[]>("http://localhost:8080/book");
  }
}
