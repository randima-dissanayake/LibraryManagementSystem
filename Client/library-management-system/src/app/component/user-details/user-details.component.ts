import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user : User

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  transactionsByUserId(){
    // this.transactionService.getTransactionByUserId(this.user.id){

    // }
  }

}
