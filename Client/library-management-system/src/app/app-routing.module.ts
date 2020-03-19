import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { BookDetailsComponent } from './component/book-details/book-details.component';
import { TransactionDetailsComponent } from './component/transaction-details/transaction-details.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'bookdetails', component: BookDetailsComponent },
  { path: 'transactiondetails', component: TransactionDetailsComponent },
  { path: 'userdetails', component: UserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
