import { Component, OnInit, Output } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/model/Book';
import { TransactionService } from 'src/app/service/transaction.service';
import { Transaction } from 'src/app/model/Transaction';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  book = 'Book';
  transaction = 'Transaction';
  fine = 'Fine';
  user = 'User';

  books:Array<Book>=[];
  transactions: Array<Transaction>=[];
  users: Array<User>=[];

  selectedTab = this.book;
  bookColor:string = '#fff'; 
  transactionColor: string = '#fff'; 
  fineColor: string = '#fff'; 
  userColor : string = '#fff';

  loadComponent : boolean = false;

  constructor(private bookService: BookService, private transactionService : TransactionService, private userService: UserService) { }

  ngOnInit(): void {
    this.fetchAllBooks();
  }

  changeSelectedTab( event: any,value: string){
    this.selectedTab = value;
    if(this.selectedTab == 'Book'){
      this.bookColor = '#17a2b8'
      this.transactionColor = '#fff'; 
      this.fineColor = '#fff'; 
      this.userColor = '#fff';
      this.fetchAllBooks();
    } else if(this.selectedTab == 'Transaction'){
      this.bookColor = '#fff'
      this.transactionColor = '#17a2b8'
      this.fineColor = '#fff'; 
      this.userColor = '#fff';
      this.fetchAllTransactions();
    } else if(this.selectedTab == 'User') {
      this.userColor = '#17a2b8'
      this.bookColor = '#fff'
      this.transactionColor = '#fff'
      this.fineColor = '#fff'; 
      this.fetchAllUsers();

    }
  }

  save(){
    this.bookService.save();
  }

  fetchAllBooks(){
    this.bookService.fetchAllBooks().subscribe(
      (data: Book[])=> this.books = data,
      (error)=>console.log(error)
    )
  } 

  fetchAllTransactions(){
    this.transactionService.fetchAllTransactions().subscribe(
      (data: Transaction[])=> this.transactions = data,
      (error)=>console.log(error)
    )
  }

  fetchAllUsers(){
    this.userService.fetchAllUsers().subscribe(
      (data: User[])=> this.users = data,
      (error)=>console.log(error)
    )
  }

  loadMyChildComponent() {
    this.loadComponent = true;
  }

}
