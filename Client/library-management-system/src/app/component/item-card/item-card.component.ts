import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/model/Book';
import { Transaction } from 'src/app/model/Transaction';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionDetailsComponent } from '../transaction-details/transaction-details.component';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() bookObj : Book
  @Input() transactionObj : Transaction
  @Input() userObj : User
  @Input() fineObj : Transaction

  constructor(private router: Router, private modalService:NgbModal) { }

  ngOnInit(): void {
  }

  showBookDetalis(bookObj){
    localStorage.setItem('book', JSON.stringify(bookObj));
    this.modalService.open(BookDetailsComponent);
    // this.router.navigate(["bookdetails"]);
  }

  showTransactionDetalis(transactionObj){
    localStorage.setItem('transaction', JSON.stringify(transactionObj));
    this.modalService.open(TransactionDetailsComponent);
    // this.router.navigate(["transactiondetails"]);
  }

  showUserDetalis(userObj){
    localStorage.setItem('user', JSON.stringify(userObj));
    this.modalService.open(UserDetailsComponent);
    // this.router.navigate(["userdetails"]);
  }

  showFineDetalis(fineObj){
    localStorage.setItem('fine', JSON.stringify(fineObj));
    this.modalService.open(TransactionDetailsComponent);
    // this.router.navigate(["transactiondetails"]);
  }

}
