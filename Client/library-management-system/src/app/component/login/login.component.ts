import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  invalidLogin = false
  loginForm
  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      userEmail : '',
      password : ''
    });
   }

  ngOnInit(): void {
  }

  login(data) {
    console.log("qqqqqqqqqqqq",data)
    if (this.authService.authenticate(data)) {
      console.log("oooooooo")
      this.router.navigate(['dashboard'])
      this.invalidLogin = false
    } else
      this.invalidLogin = true
  }

}
