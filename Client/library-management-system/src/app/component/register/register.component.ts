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
      firstName : '',
      lastName : '',
      username : '',
      password : '',
      repeatPassword:'',
      telephones : this.formBuilder.array([]) ,
      roles : this.formBuilder.array([{"role":"USER"}]),
      locked: false
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
