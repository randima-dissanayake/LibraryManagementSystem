import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  users: Array<User>=[];
  p: number = 1;
  searchTerm;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(){
    this.userService.fetchAllUsers().subscribe(
      (data: any)=> {
        if(data!=null)
          this.users = data
      },
      (error)=>console.log(error)
    )
  }

}
