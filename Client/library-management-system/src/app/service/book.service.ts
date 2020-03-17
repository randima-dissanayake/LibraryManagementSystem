import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../model/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http : HttpClient) { }

  save(){
    console.log("hariii");
  }

  fetchAllBooks(){
    return this.http.get<Book[]>("http://localhost:8080/book");
  }
}
