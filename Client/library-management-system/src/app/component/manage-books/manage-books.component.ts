import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/model/Book';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.scss']
})
export class ManageBooksComponent implements OnInit {

  books: Array<Book>=[];
  p: number = 1;
  searchTerm;
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(){
    this.bookService.fetchAllBooks().subscribe(
      (data: any)=> {
        if(data!=null)
          this.books = data
      },
      (error)=>console.log(error)
    )
  }

}
