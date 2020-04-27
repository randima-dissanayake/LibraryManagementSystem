import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/model/Transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-transactions',
  templateUrl: './manage-transactions.component.html',
  styleUrls: ['./manage-transactions.component.scss']
})
export class ManageTransactionsComponent implements OnInit {

  transactions: Array<Transaction>=[];
  p: number = 1;
  searchTerm;
  constructor(private transactionService : TransactionService) { }

  ngOnInit(): void {
    this.fetchAllTransactions();
  }

  fetchAllTransactions(){
    this.transactions = []
    this.transactionService.fetchAllTransactions().subscribe(
      (data: any)=> {
        for (let i = 0; i < data.length; i++) {
          if(!data[i].returned){
            this.transactions.push(data[i]);
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
          showConfirmButton: true
        })
        console.log(error)
      }
    )
  }

  renewTransaction(transaction){
    if(transaction.renew_flag == 0){
      Swal.fire({
        title: 'Are you sure?',
        text: "Return book before time exceed, If not fine will be calculated (Rs. 5 per day)",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, borrow it!'
      }).then((result) => {
        if (result.value) {
          this.transactionService.renew(transaction.id).subscribe(
            (data: Transaction) => {
              console.log("saved transaction ",data)
            Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Renewed for 7 more days',
                    showConfirmButton: true
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
                showConfirmButton: true
              })
              console.log(error)
            }
          );
        }});
    } else {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: "You already renewed!",
        showConfirmButton: true
      })
    }
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
              showConfirmButton: true
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
              showConfirmButton: true
            })
            console.log(error)
          }
        );
      }});
  }

}
