import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/model/Transaction';
import Swal from 'sweetalert2';
import { TransactionService } from 'src/app/service/transaction.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-manage-fines',
  templateUrl: './manage-fines.component.html',
  styleUrls: ['./manage-fines.component.scss']
})
export class ManageFinesComponent implements OnInit {

  isAdmin
  transactions: Array<Transaction>=[];
  p: number = 1;
  searchTerm;
  constructor(private transactionService:TransactionService) { 
    this.isAdmin = AuthService.isAdmin();
  }

  ngOnInit(): void {
    this.fetchAllFines();
  }

  fetchAllFines(){
    if(this.isAdmin){
      this.transactions=[]
    this.transactionService.fetchAllFinesNotReturned().subscribe(
      (data: any)=> {
        for (let i = 0; i < data.length; i++) {
          if(!data[i].returned && data[i].fine > 0){
            this.transactions.push(data[i]);
          }
        }
        // this.fines = data;
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
      }
    )
    } else {
      this.transactions = []
      this.transactionService.getTransactionByUniversityId(JSON.parse(sessionStorage.getItem('user')).universityId).subscribe(
        (data: Transaction[])=> {
          for (let i = 0; i < data.length; i++) {
            if(!data[i].returned && data[i].fine>0){
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
      }
      )
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
              showConfirmButton: true,
              timer: 5000
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
              showConfirmButton: true,
              timer: 5500
            })
            console.log(error)
          }
        );
      }});
  }

}
