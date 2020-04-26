import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/model/Transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-transactions',
  templateUrl: './my-transactions.component.html',
  styleUrls: ['./my-transactions.component.scss']
})
export class MyTransactionsComponent implements OnInit {

  transactions: Array<Transaction>=[];
  p: number = 1;
  searchTerm;
  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.fetchAllUsers(JSON.parse(sessionStorage.getItem('user')).universityId);
  }

  fetchAllUsers(id){
    this.transactionService.getTransactionByUniversityId(id).subscribe(
      (data: any)=> {
        if(data!=null)
          this.transactions = data
          console.log("mytransactions  ",this.transactions)
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
        console.log(error)
      }
    )
  }

  renewTransaction(id){
    Swal.fire({
      title: 'Are you sure?',
      text: "Return book before time exceed, If not fine will be calculated (Rs. 5 per day)",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, renew it!'
    }).then((result) => {
      if (result.value) {
        this.transactionService.renew(id).subscribe(
          (data: Transaction) => {
            console.log("saved transaction ",data)
          Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Renewed for 7 more days',
                  showConfirmButton: true,
                  timer: 5500
                })
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
      }});
  }

  returnTransaction(id){
    Swal.fire({
      title: 'Are you sure?',
      text: "You can renew If you are not already renew the book, Or return",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, return it!'
    }).then((result) => {
      if (result.value) {
        this.transactionService.return(id).subscribe(
          (data: Transaction) => {
            console.log("saved transaction ",data)
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Returned Successfully',
              showConfirmButton: true,
              timer: 5000
            })
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
      }});
  }

}
