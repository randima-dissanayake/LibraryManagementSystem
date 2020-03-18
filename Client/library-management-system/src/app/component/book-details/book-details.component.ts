import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/model/Book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  @Input() bookObj: Book
  
  constructor() { }

  ngOnInit(): void {
    console.log("oooooooooooo"+this.bookObj.title)
  }

}
