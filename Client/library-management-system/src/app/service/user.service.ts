import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http : HttpClient) { }

  fetchAllUsers() {
    return this.http.get<User[]>("http://localhost:8181/user");
  }

  save(data){
    return this.http.post<User>("http://localhost:8181/user",data);
  }
}
