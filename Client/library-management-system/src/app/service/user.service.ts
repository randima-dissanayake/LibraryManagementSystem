import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // baseUrl = "http://localhost:8181/"
  baseUrl = "http://192.168.8.100:8181/"
  constructor(private http : HttpClient) { }

  fetchAllUsers() {
    return this.http.get<User[]>("http://localhost:8181/user");
  }

  save(data){
    return this.http.post<User>(this.baseUrl+"register",data);
  }
}
