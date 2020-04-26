import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  username
  constructor(private authService: AuthService, private router: Router) {
    this.username = sessionStorage.getItem('username');
   }

  ngOnInit(): void {
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate([''])
  }

}
