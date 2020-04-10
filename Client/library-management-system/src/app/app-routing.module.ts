import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { BookDetailsComponent } from './component/book-details/book-details.component';
import { TransactionDetailsComponent } from './component/transaction-details/transaction-details.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { RegisterComponent } from './component/register/register.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { MyProfileComponent } from './component/my-profile/my-profile.component';
import { ManageUsersComponent } from './component/manage-users/manage-users.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGaurdService] },
  { path: 'bookdetails', component: BookDetailsComponent, canActivate:[AuthGaurdService] },
  { path: 'transactiondetails', component: TransactionDetailsComponent, canActivate:[AuthGaurdService] },
  { path: 'userdetails', component: UserDetailsComponent, canActivate:[AuthGaurdService] },
  { path: 'myprofile', component: MyProfileComponent, canActivate:[AuthGaurdService] },
  { path: 'users', component: ManageUsersComponent, canActivate:[AuthGaurdService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
