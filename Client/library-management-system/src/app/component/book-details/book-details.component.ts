import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/model/Book';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { TransactionService } from 'src/app/service/transaction.service';
import { Transaction } from 'src/app/model/Transaction';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  bookObj: Book
  
  constructor(private modalService: NgbModal, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.bookObj = JSON.parse(localStorage.getItem('book'))
  }

  openAddTransaction(){
    const transactionData = {
      'bookId' : this.bookObj.id,
      'universityId' : JSON.parse(sessionStorage.getItem('user')).universityId
    }
    // this.modalService.open(AddTransactionComponent);
    this.transactionService.save(transactionData).subscribe(
      (data: Transaction) => console.log("saved transaction ",data),
      (error) => console.log(error)
    );
  }

}
