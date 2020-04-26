import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { AppConstants } from '../app.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  fetchAllUsers():Observable<any> {
    console.log("wwwwwwwwwwwwwww",sessionStorage.getItem('token'))
    return this.http.get<User[]>(this.baseUrl+"user",this.httpOptions).pipe(map(data =>{
      console.log("qwqwqwq",data)
      return data;
    }))
  }

  getUserByUniversityId(uId) {
    console.log("asass",uId)
    return this.http.get<User>(this.baseUrl+"user/uid/"+uId,this.httpOptions)
  }

  updateUser(user){
    return this.http.put<User>(this.baseUrl+"user",user,this.httpOptions)
  }

  
}
