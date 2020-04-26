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
  public static get baseURL(): string { return "http://localhost:8082/"; }
  // public static get baseURL(): string { return "http://localhost:"; }
  public static get baseURLUser(): string { return "http://192.168.8.103:8181/"; }
  public static get baseURLBook(): string { return "http://192.168.8.103:8080/"; }
  public static get baseURLTransaction(): string { return "http://192.168.8.103:8081/"; }
}