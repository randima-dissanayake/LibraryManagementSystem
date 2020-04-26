import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/model/Book';
import { TransactionService } from 'src/app/service/transaction.service';
import { Transaction } from 'src/app/model/Transaction';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/User';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBookComponent } from '../add-book/add-book.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { DomSanitizer } from '@angular/platform-browser';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';

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
  fines: Array<Transaction> = [];

  selectedTab = 'Book';
  bookColor:string = '#17a2b8'; 
  transactionColor: string = '#fff'; 
  fineColor: string = '#fff'; 
  userColor : string = '#fff';

  isAdmin

  constructor(private bookService: BookService, 
    private transactionService : TransactionService, 
    private userService: UserService, 
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
    ) { 
      this.isAdmin = AuthService.isAdmin()
    }

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
    } else if(this.selectedTab == 'myProfile'){
      this.userColor = '#17a2b8'
      this.bookColor = '#fff'
      this.transactionColor = '#fff'
      this.fineColor = '#fff';
    } else if(this.selectedTab == 'Fine'){
      this.userColor = '#fff'
      this.bookColor = '#fff'
      this.transactionColor = '#fff'
      this.fineColor = '#17a2b8';
      this.fetchAllFines();
    }

  }

  fetchAllBooks(){
    this.bookService.fetchAllBooks().subscribe(
      (data: Book[])=> {
        this.books = data
      },(error)=>{
        let errorMsg = "Something went Wrong";
        if (error.status === 401) {
          errorMsg = "Unauthorized";
        } 
        console.log("error", error)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: errorMsg,
          showConfirmButton: true,
          timer: 5500
        })
        console.log(error)
      }
    )
  } 

  fetchAllTransactions(){
    if(this.isAdmin){
    this.transactionService.fetchAllTransactions().subscribe(
      (data: Transaction[])=> this.transactions = data,
      (error)=>{
        let errorMsg = "Something went Wrong";
        if (error.status === 401) {
          errorMsg = "Unauthorized";
        } 
        console.log("error", error)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: errorMsg,
          showConfirmButton: true,
          timer: 5500
        })
      }
    )} else {
      this.transactionService.getTransactionByUniversityId(JSON.parse(sessionStorage.getItem('user')).universityId).subscribe(
        (data: Transaction[])=> this.transactions = data,
      (error)=>{
        let errorMsg = "Something went Wrong";
        if (error.status === 401) {
          errorMsg = "Unauthorized";
        } 
        console.log("error", error)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: errorMsg,
          showConfirmButton: true,
          timer: 5500
        })
      }
      )
    }
  }

  fetchAllUsers(){
    this.userService.fetchAllUsers().subscribe(
      (data: any)=> {
        if(data!=null)
          this.users = data
      },
      (error)=>{
        let errorMsg = "Something went Wrong";
        if (error.status === 401) {
          errorMsg = "Unauthorized";
        } 
        console.log("error", error)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: errorMsg,
          showConfirmButton: true,
          timer: 5500
        })
      }
    )
  }

  fetchAllFines(){
    if(this.isAdmin){
    this.transactionService.fetchAllFinesNotReturned().subscribe(
      (data: any)=> {
        // for (let i = 0; i < data.length; i++) {
        //   if(data[i].fine > 0){
        //     this.fines.push(data[i]);
        //   }
        // }
        this.fines = data;
      },
      (error)=>{
        let errorMsg = "Something went Wrong";
        if (error.status === 401) {
          errorMsg = "Unauthorized";
        } 
        console.log("error", error)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: errorMsg,
          showConfirmButton: true,
          timer: 5500
        })
      }
    )
    } else {
      this.fines = []
      this.transactionService.getTransactionByUniversityId(JSON.parse(sessionStorage.getItem('user')).universityId).subscribe(
        (data: Transaction[])=> {
          for (let i = 0; i < data.length; i++) {
            if(data[i].fine>0){
              this.fines.push(data[i]);
            }
          }
        },
      (error)=>{
        let errorMsg = "Something went Wrong";
        if (error.status === 401) {
          errorMsg = "Unauthorized";
        } 
        console.log("error", error)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: errorMsg,
          showConfirmButton: true,
          timer: 5500
        })
      }
      )
    }
  }

  open() {
    if(this.selectedTab=='Book')
      this.modalService.open(AddBookComponent);
    else if(this.selectedTab=='Transaction')
      this.modalService.open(AddTransactionComponent);
    else if(this.selectedTab=='User')
      this.modalService.open(AddUserComponent);
    // modalRef.componentInstance.name = 'World';
  }


}
