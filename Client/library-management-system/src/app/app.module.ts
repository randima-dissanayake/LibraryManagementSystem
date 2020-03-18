import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { CardComponent } from './component/card/card.component';
import { ItemCardComponent } from './component/item-card/item-card.component';
import { BookDetailsComponent } from './component/book-details/book-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SideBarComponent,
    NavBarComponent,
    CardComponent,
    ItemCardComponent,
    BookDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
