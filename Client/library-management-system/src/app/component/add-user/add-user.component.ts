import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  checkoutForm;
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private userService: UserService) { 
    this.checkoutForm = this.formBuilder.group({
      studentId : 0,
      userEmail : '',
      password : '',
      role : '',
      enabled : true
    });
  }

  ngOnInit(): void {
  }

  addNewUser(data){
    console.log(data);
    this.userService.save(data).subscribe(
      (data: User)=>  console.log(data),
      (error)=>console.log(error)
    );
    this.checkoutForm.reset();
  }

}
