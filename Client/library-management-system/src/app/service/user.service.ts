import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // baseUrl = "http://localhost:8181/"
  baseUrl = "http://192.168.8.102:8181/"
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization':  sessionStorage.getItem('token'),
      'Content-Type': 'application/json',
    })
  };
  constructor(private http : HttpClient) { }

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
    return this.http.get<User[]>(this.baseUrl+"user",this.httpOptions)
  }

  save(data){
    return this.http.post<User>(this.baseUrl+"register",data);
  }
}
