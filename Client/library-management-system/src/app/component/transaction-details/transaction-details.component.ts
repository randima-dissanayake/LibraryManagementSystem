import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/model/Transaction';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {

  transaction: Transaction

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transaction = JSON.parse(localStorage.getItem('transaction'));
  }

  renewBook(){
    this.transactionService.renew(this.transaction.id).subscribe(
      (data: Transaction) => {
        this.transaction = data; 
        console.log("saved transaction ",data)
      },
      (error) => console.log(error)
    );
  }

}
