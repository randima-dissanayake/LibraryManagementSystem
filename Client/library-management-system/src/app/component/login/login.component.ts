import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  invalidLogin = false
  loginForm
  submitted = false
  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder, private userService: UserService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls; }

  login(data) {
    this.submitted = true;
    if (this.loginForm.valid) {
      let userData = {
        "username": this.f.username.value,
        "password": this.f.password.value
      }
      // console.log("qqqqqqqqqqqq",JSON.stringify(data1))
      // if (this.authService.authenticate(JSON.stringify(data))) {
      //   console.log("oooooooo")
      //   this.router.navigate(['dashboard'])
      //   this.invalidLogin = false
      // } else
      //   this.invalidLogin = true
      this.authService.authenticate(userData).subscribe(res => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
        this.router.navigate(['dashboard'])
      }, error => {
        let errorMsg = "Something went Wrong";
        if (error.status === 401) {
          errorMsg = "Username Password mismatch";
        }
        console.log("error", error)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: errorMsg,
          showConfirmButton: true
        })
        this.invalidLogin = true
      })
    }
  }

}
