import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/model/Transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-old-transactions',
  templateUrl: './old-transactions.component.html',
  styleUrls: ['./old-transactions.component.scss']
})
export class OldTransactionsComponent implements OnInit {

  transactions: Array<Transaction>=[];
  p: number = 1;
  searchTerm;
  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.fetchAllTransactions();
  }

  fetchAllTransactions(){
    this.transactions = []
    this.transactionService.fetchAllTransactions().subscribe(
      (data: any)=> {
        for (let i = 0; i < data.length; i++) {
          if(data[i].returned){
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
          showConfirmButton: true,
          timer: 5500
        })
        console.log(error)
      }
    )
  }

  


}
