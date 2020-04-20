import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppConstants } from '../app.component';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticationState = new BehaviorSubject(false);
  baseUrl
  constructor(private httpClient:HttpClient, private router: Router) { 
    this.baseUrl = AppConstants.baseURL+"8082/"
    this.checkToken();
  }

  authenticate(formData) {
    console.log("username", formData)
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.httpClient.post<any>(this.baseUrl+"authenticate",formData,{headers: headers}).pipe(
     map(
      userData => {
       console.log("eeeeeeeeeeeee",userData.user)
       sessionStorage.setItem('token', 'Bearer '+userData.token)
       sessionStorage.setItem('user', JSON.stringify(userData.user))
       sessionStorage.setItem('username', userData.user.firstName)
       this.authenticationState.next(true);
       return true;
      }
     )

   );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log("isUserLoggedIn"+!(user == null))
    return !(user == null)
  }

  logOut() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  checkToken() {
    let token = sessionStorage.getItem('token')
     if (token) {
       let decoded = helper.decodeToken(token);
       let isExpired = helper.isTokenExpired(token);

       if (!isExpired) {
         this.authenticationState.next(true);
       } else {
         sessionStorage.removeItem('token');
         this.authenticationState.next(false);
       }
     } else { 
       this.router.navigate(['login']);
     }
 }
}
