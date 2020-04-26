import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from 'src/app/service/transaction.service';
import { Transaction } from 'src/app/model/Transaction';
import { AddBookComponent } from '../add-book/add-book.component';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  bookObj
  isAdmin;
  constructor(private modalService: NgbModal, private transactionService: TransactionService,public activeModal: NgbActiveModal) {
    this.isAdmin = AuthService.isAdmin();
   }

  ngOnInit(): void {
    this.bookObj = JSON.parse(localStorage.getItem('book'))
  }

  openAddTransaction(){
  if(this.bookObj.enabled){
    const transactionData = {
      'bookId' : this.bookObj.id,
      'universityId' : JSON.parse(sessionStorage.getItem('user')).universityId
    }

    Swal.fire({
      title: 'Do you want to borrow?',
      text: "You have to return book within 14 days or you can renew for 7 more days",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, borrow it!'
    }).then((result) => {
      if (result.value) {
        this.transactionService.save(transactionData).subscribe(
          (data: Transaction) => {  
            console.log("saved transaction ",data)
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Borrowed Successfully',
              showConfirmButton: true,
              timer: 5000
            })
            window.location.reload()
        },
          (error) => {
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
        );
      }
    })
  } else {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Wait until '+this.bookObj.last_available_date,
      showConfirmButton: true,
      timer: 5000
    })
  }
    // this.modalService.open(AddTransactionComponent);
    
  }

  editBook(){
    const modalRef = this.modalService.open(AddBookComponent,this.bookObj);
    modalRef.componentInstance.book = this.bookObj
  }

}
