import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  userName;
  constructor() { 
    this.userName = sessionStorage.getItem('username');
  }

  ngOnInit(): void {
  }

}
