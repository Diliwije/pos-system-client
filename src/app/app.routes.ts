import { Routes } from '@angular/router';
import {Login} from './pages/login/login';
import {Notfound} from './pages/notfound/notfound';
import {DashboardContext} from './pages/dashboard-context/dashboard-context';
import {authGuard} from './guards/auth-guard';
import {DashboardCustomerPage} from './pages/dashboard-customer-page/dashboard-customer-page';
import {DashboardOrderPage} from './pages/dashboard-order-page/dashboard-order-page';
import {DashboardProductPage} from './pages/dashboard-product-page/dashboard-product-page';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: Login },

  {
    path: 'dashboard',component:DashboardContext ,canActivate:[authGuard],children:[
      {
        path:'',redirectTo:'/dashboard/customer',pathMatch:'full'
      },
      {
        path:'customers',component:DashboardCustomerPage
      },
      {
        path:'orders',component:DashboardOrderPage
      },
      {
        path:'product',component:DashboardProductPage
      }
    ]
  },

  { path: '**', component: Notfound }



];
