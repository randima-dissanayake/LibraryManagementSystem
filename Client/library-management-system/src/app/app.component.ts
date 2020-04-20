import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'library-management-system';
}

export class AppConstants {
  // public static get baseURL(): string { return "http://192.168.8.103:"; }
  public static get baseURL(): string { return "http://localhost:"; }
}