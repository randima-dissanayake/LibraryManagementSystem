import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { AppConstants } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization':  sessionStorage.getItem('token'),
      'Content-Type': 'application/json'
    })
  };
  constructor(private http : HttpClient) {
    this.baseUrl=AppConstants.baseURLUser;
   }

  fetchAllUsers() {
    console.log("wwwwwwwwwwwwwww",this.httpOptions)
    return this.http.get<User[]>(this.baseUrl+"user",this.httpOptions)
  }

  getUserByUniversityId(uId) {
    console.log("asass",uId)
    return this.http.get<User>(this.baseUrl+"user/"+uId,this.httpOptions)
  }

  
}
