import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  authenticate(formData) {
    let username = formData.userEmail
    let password = formData.password
    // if (username === "randima" && password === "123") {
    //   sessionStorage.setItem('username',username)
    //   console.log("true")
    //   return true;
    // } else {
    //   console.log("false")
    //   return false;
    // }
    console.log("username", username)
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get<User>('http://localhost:8181/user/validateLogin',{headers}).pipe(
     map(
       userData => {
        console.log("eeeeeeeeeeeee",userData)
        sessionStorage.setItem('username',username);
        return true;
       }
     )

    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}
