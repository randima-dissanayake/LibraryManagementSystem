import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';
import { PasswordStrengthValidator } from 'src/app/shared/password-strength.validators';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { 
    this.registerForm = this.formBuilder.group({
      universityId : ['', Validators.required],
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      username : ['',[Validators.required, Validators.email]],
      password : ['', [Validators.required,PasswordStrengthValidator]],
      repeatPassword:['', Validators.required],
      telephone1 : ['', Validators.required] ,
      telephone2 : '' 

      // telephone : '',
      // role : "USER",
    },
    {    
      validator: this.MustMatch('password', 'repeatPassword')
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.registerForm.controls; }

  addNewUser(registerForm) {
    this.submitted = true;
    if (this.registerForm.valid) {
      let userData = {
        "firstName": this.f.firstName.value,
        "lastName": this.f.lastName.value,
        "username": this.f.username.value,
        "universityId": this.f.universityId.value,
        "password": this.f.password.value,
        "telephones": [
          {"number":this.f.telephone1.value},
          {"number":this.f.telephone2.value} 
        ] ,
        "roles" : [
          {"role" : "USER"}
        ],
        "enable" : false ,
        "locked" : false  
      }
    console.log("qqqq"+userData);
    this.authService.save(userData).subscribe(
      (data: User) => {
        this.registerForm.reset();
        this.router.navigate(["dashboard"]);
        console.log(data)},
      (error) => console.log(error)
    );
    
  }
}

MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

}
