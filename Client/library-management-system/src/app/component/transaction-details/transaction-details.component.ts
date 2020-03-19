import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/model/Transaction';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {

  transaction: Transaction

  constructor() { }

  ngOnInit(): void {
    this.transaction = JSON.parse(localStorage.getItem('transaction'));
  }

}
