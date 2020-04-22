import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/model/Transaction';
import { TransactionService } from 'src/app/service/transaction.service';

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
    this.fetchAllUsers();
  }

  fetchAllUsers(){
    this.transactionService.fetchAllTransactions().subscribe(
      (data: any)=> {
        if(data!=null)
          this.transactions = data
      },
      (error)=>console.log(error)
    )
  }

}
