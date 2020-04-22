import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @Input() public user; 
  checkoutForm;
  title;
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private authService: AuthService) { 
    
  }

  ngOnInit(): void {
    if(this.user!=null){
      this.title = "Edit User"
      this.checkoutForm = this.formBuilder.group({
        studentId : this.user.studentId,
        firstName : this.user.firstName,
        lastName : this.user.lastName,
        userEmail : this.user.userEmail,
        password : this.user.password,
        role : this.user.role,
        enabled : true
      });
    } else {
      this.title = "Add User"
      this.checkoutForm = this.formBuilder.group({
        studentId : 0,
        firstName : '',
        lastName : '',
        userEmail : '',
        password : '',
        role : '',
        enabled : true
      });
    }
  }

  addNewUser(data){
    console.log(data);
    this.authService.save(data).subscribe(
      (data: User)=>  console.log(data),
      (error)=>console.log(error)
    );
    this.checkoutForm.reset();
  }

}
