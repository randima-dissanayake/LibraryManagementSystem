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
    // let data1 = {
    //   userEmail : "randima@gmail.com",
	  //   password : "123"
    // }
    // console.log("qqqqqqqqqqqq",JSON.stringify(data1))
    // if (this.authService.authenticate(JSON.stringify(data))) {
    //   console.log("oooooooo")
    //   this.router.navigate(['dashboard'])
    //   this.invalidLogin = false
    // } else
    //   this.invalidLogin = true
    this.authService.authenticate(JSON.stringify(data)).subscribe(res=>{
      console.log("login ts",res)
      this.router.navigate(['dashboard'])
    },error=>{
      console.log("error",error)
      this.invalidLogin = true
    })

  }

}
