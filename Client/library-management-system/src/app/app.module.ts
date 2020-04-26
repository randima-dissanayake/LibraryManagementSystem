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
import { TransactionDetailsComponent } from './component/transaction-details/transaction-details.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { AddBookComponent } from './component/add-book/add-book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddUserComponent } from './component/add-user/add-user.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { RegisterComponent } from './component/register/register.component';
import { AddTransactionComponent } from './component/add-transaction/add-transaction.component';
import { MyProfileComponent } from './component/my-profile/my-profile.component';
import { ManageUsersComponent } from './component/manage-users/manage-users.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ManageBooksComponent } from './component/manage-books/manage-books.component';
import { ManageTransactionsComponent } from './component/manage-transactions/manage-transactions.component';
import { UpdateMyProfileComponent } from './component/update-my-profile/update-my-profile.component';
import { MyTransactionsComponent } from './component/my-transactions/my-transactions.component';
import { ManageFinesComponent } from './component/manage-fines/manage-fines.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SideBarComponent,
    NavBarComponent,
    CardComponent,
    ItemCardComponent,
    BookDetailsComponent,
    TransactionDetailsComponent,
    UserDetailsComponent,
    AddBookComponent,
    AddUserComponent,
    RegisterComponent,
    AddTransactionComponent,
    MyProfileComponent,
    ManageUsersComponent,
    ManageBooksComponent,
    ManageTransactionsComponent,
    UpdateMyProfileComponent,
    MyTransactionsComponent,
    ManageFinesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
