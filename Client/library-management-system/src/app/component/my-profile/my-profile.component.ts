import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/User';
import { UpdateMyProfileComponent } from '../update-my-profile/update-my-profile.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  user;
  constructor(private modalService: NgbModal, private userService: UserService) {
    
  }

  ngOnInit(): void {
    this.userService.getUserByUniversityId(JSON.parse(sessionStorage.getItem('user')).universityId).subscribe(
      (data: User) => {
        console.log("eeeeeeeeeeee",data)
        this.user=data
        this.user.role = JSON.parse(sessionStorage.getItem('user')).roles[0].role
      },
      (error) => {
        let errorMsg = "Something went Wrong";
        if (error.status === 401) {
          errorMsg = "Unauthorized";
        } 
        console.log("error", error)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: errorMsg,
          showConfirmButton: true,
          timer: 5500
        })
        console.log(error)
      }
    );
  }

  editUserDetails(){
    console.log("sssss")
    const modalRef = this.modalService.open(UpdateMyProfileComponent,this.user);
    modalRef.componentInstance.user = this.user;
  }

  // loadUserDetails(){
    
  //   this.userService.getUserByUniversityId(JSON.parse(sessionStorage.getItem('user')).universityId).subscribe(
  //     (data: User) => {
  //       console.log("eeeeeeeeeeee",data)
  //       this.user=data
  //     },
  //     (error) => console.log(error)
  //   );
  // }

}
