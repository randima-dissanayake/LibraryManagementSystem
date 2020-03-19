import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/model/Book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  
  // @Input() name;
  checkoutForm;
  constructor(public activeModal: NgbActiveModal, private bookService: BookService, private formBuilder: FormBuilder) { 
    this.checkoutForm = this.formBuilder.group({
      title: '',
      isbn: '',
      author:'',
      publisher:'',
      year_of_publication:'',
      location: '',
      num_of_copies:0
    });
  }

  ngOnInit(): void {
  }

  addNewBook(data){
    console.log(data);
    this.bookService.save(data).subscribe(
      (data: Book)=>  console.log(data),
      (error)=>console.log(error)
    );
    this.checkoutForm.reset();
  }
  
}
