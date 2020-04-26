import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  isAdmin;
  constructor() { 
    this.isAdmin = AuthService.isAdmin();
  }

  ngOnInit(): void {
    console.log("role isadmin ",this.isAdmin)
  }

}
