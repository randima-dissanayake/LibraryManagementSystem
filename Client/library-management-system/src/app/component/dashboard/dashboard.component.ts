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
  oldTransaction = 'OldTransaction'

  books:Array<Book>=[];
  transactions: Array<Transaction>=[];
  users: Array<User>=[];
  fines: Array<Transaction> = [];
  returnedList: Array<Transaction> = [];

  selectedTab = 'Book';
  bookColor:string = '#afbfed'; 
  transactionColor: string = '#fff'; 
  fineColor: string = '#fff'; 
  userColor : string = '#fff';
  oldTransactionColor: string = '#fff';

  isAdmin

  constructor(private bookService: BookService, 
    private transactionService : TransactionService, 
    private userService: AuthService, 
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
      this.bookColor = '#afbfed'
      this.transactionColor = '#fff'; 
      this.fineColor = '#fff'; 
      this.userColor = '#fff';
      this.oldTransactionColor = '#fff'
      this.fetchAllBooks();
    } else if(this.selectedTab == 'Transaction'){
      this.bookColor = '#fff'
      this.transactionColor = '#afbfed'
      this.fineColor = '#fff'; 
      this.userColor = '#fff';
      this.oldTransactionColor = '#fff'
      this.fetchAllTransactions();
    } else if(this.selectedTab == 'User') {
      this.userColor = '#afbfed'
      this.bookColor = '#fff'
      this.transactionColor = '#fff'
      this.fineColor = '#fff'; 
      this.oldTransactionColor = '#fff'
      this.fetchAllUsers();
    } else if(this.selectedTab == 'myProfile'){
      this.userColor = '#afbfed'
      this.bookColor = '#fff'
      this.transactionColor = '#fff'
      this.fineColor = '#fff';
      this.oldTransactionColor = '#fff'
    } else if(this.selectedTab == 'Fine'){
      this.userColor = '#fff'
      this.bookColor = '#fff'
      this.transactionColor = '#fff'
      this.fineColor = '#afbfed';
      this.oldTransactionColor = '#fff'
      this.fetchAllFines();
    } else if(this.selectedTab == 'OldTransaction'){
      this.fineColor = '#fff'
      this.bookColor = '#fff'
      this.transactionColor = '#fff'
      this.oldTransactionColor = '#afbfed';
      this.fetchAllOldTransactions();
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
      this.transactions=[]
    this.transactionService.fetchAllTransactions().subscribe(
      (data: Transaction[])=> {
        for (let i = 0; i < data.length; i++) {
          if(!data[i].returned){
            this.transactions.push(data[i]);
          }
        }
        // this.transactions = data
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
    )} else {
      this.transactions=[]
      this.transactionService.getTransactionByUniversityId(JSON.parse(sessionStorage.getItem('user')).universityId).subscribe(
        (data: Transaction[])=> {
          for (let i = 0; i < data.length; i++) {
            if(!data[i].returned){
              this.transactions.push(data[i]);
            }
          }
          // this.transactions = data
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

  fetchAllUsers(){
    this.users = []
    this.userService.fetchAllUsers().subscribe(
      (data: any)=> {
        for (let i = 0; i < data.length; i++) {
          if(!data[i].delete){
            this.users.push(data[i]);
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

  fetchAllFines(){
    if(this.isAdmin){
      this.fines=[]
    this.transactionService.fetchAllFinesNotReturned().subscribe(
      (data: any)=> {
        for (let i = 0; i < data.length; i++) {
          if(!data[i].returned && data[i].fine > 0){
            this.fines.push(data[i]);
          }
        }
        // this.fines = data;
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
            if(!data[i].returned && data[i].fine>0){
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

  fetchAllOldTransactions(){
    this.returnedList = []
      this.transactionService.getTransactionByUniversityId(JSON.parse(sessionStorage.getItem('user')).universityId).subscribe(
        (data: Transaction[])=> {
          for (let i = 0; i < data.length; i++) {
            if(data[i].returned){
              this.returnedList.push(data[i]);
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
  

  open() {
    console.log("add 0",this.selectedTab)
    if(this.selectedTab=='Book')
      this.modalService.open(AddBookComponent);
    else if(this.selectedTab=='Transaction')
      this.modalService.open(AddTransactionComponent);
    else if(this.selectedTab=='User')
      this.modalService.open(AddUserComponent);
    // modalRef.componentInstance.name = 'World';
  }


}
