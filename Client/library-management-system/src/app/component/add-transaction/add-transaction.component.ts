import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { TransactionService } from 'src/app/service/transaction.service';
import { Transaction } from 'src/app/model/Transaction';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {

  addTransactionForm
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private transactionService: TransactionService) { 
    this.addTransactionForm = this.formBuilder.group({
      universityId : 0,
      bookId : ''
    });
  }

  ngOnInit(): void {
  }

  addNewTransaction(data){
    console.log(data);
    this.transactionService.save(data).subscribe(
      (data: Transaction)=>  {
        console.log(data)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Borrowed Successfully, Return within 14 days or Renew for 7 more days',
          showConfirmButton: true,
          timer: 5000
        })
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
    );
    this.addTransactionForm.reset();
  }

}
