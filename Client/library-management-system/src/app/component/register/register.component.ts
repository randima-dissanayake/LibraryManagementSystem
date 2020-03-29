import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { 
    this.registerForm = this.formBuilder.group({
      studentId : 0,
      fristName : '',
      lastName : '',
      userEmail : '',
      password : '',
      repeatPassword:'',
      role : 'borrower',
      enabled : true
    });
  }

  ngOnInit(): void {
  }

  addNewUser(registerForm) {
    console.log("qqqq"+JSON.stringify(registerForm));

    this.userService.save(registerForm).subscribe(
      (data: User) => {
        this.router.navigate(["dashboard"]);
        console.log(data)},
      (error) => console.log(error)
    );
    this.registerForm.reset();
  }

}