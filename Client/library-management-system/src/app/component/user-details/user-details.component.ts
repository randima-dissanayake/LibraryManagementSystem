import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { TransactionService } from 'src/app/service/transaction.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userObj : User

  constructor(private transactionService: TransactionService, public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.userObj = JSON.parse(localStorage.getItem('user'));
    console.log("userObj  ",this.userObj)
  }

  transactionsByUserId(){
    // this.transactionService.getTransactionByUserId(this.user.id){

    // }
  }

  editUser(user){
    const modalRef = this.modalService.open(AddUserComponent,user);
    modalRef.componentInstance.user = user
  }

}
