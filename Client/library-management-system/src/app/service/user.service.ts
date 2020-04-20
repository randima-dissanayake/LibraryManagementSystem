import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { map } from 'rxjs/operators';
import { AppConstants } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization':  sessionStorage.getItem('token'),
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  constructor(private http : HttpClient) {
    this.baseUrl=AppConstants.baseURL+"8082/";
   }

  fetchAllUsers() {
    // const headers = new HttpHeaders();
    // headers.append('Content-Type','application/json')
    // headers.append('Authorization', sessionStorage.getItem('token'))

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Authorization': sessionStorage.getItem('token')
    //   })
    // };
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : sessionStorage.getItem('token')
    });
    console.log("wwwwwwwwwwwwwww",this.httpOptions)
    return this.http.get<User[]>(this.baseUrl+"user",{headers:headers})
  }

  save(data){
    console.log("rrrrrrrrrrrrrrr",data)
    return this.http.post<User>(this.baseUrl+"register",data);
  }
}
