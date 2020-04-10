import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  user;
  constructor(private modalService: NgbModal) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
   }

  ngOnInit(): void {
  }

  editUserDetails(){
    const modalRef = this.modalService.open(AddUserComponent,this.user);
    modalRef.componentInstance.user = this.user;
  }

}
