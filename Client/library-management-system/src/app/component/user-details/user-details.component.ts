import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { TransactionService } from 'src/app/service/transaction.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user : User

  constructor(private transactionService: TransactionService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("userObj  ",this.user)
  }

  transactionsByUserId(){
    // this.transactionService.getTransactionByUserId(this.user.id){

    // }
  }

}
