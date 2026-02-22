import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { DashboardContext } from './pages/dashboard-context/dashboard-context';
import { authGuard } from './guards/auth-guard';
import { DashboardCustomerPage } from './pages/dashboard-customer-page/dashboard-customer-page';
import { DashboardOrderPage } from './pages/dashboard-order-page/dashboard-order-page';
import { DashboardProductPage } from './pages/dashboard-product-page/dashboard-product-page';
import { Notfound } from './pages/notfound/notfound';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  {
    path: 'dashboard', component: DashboardContext, canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'customers', pathMatch: 'full' },
      { path: 'customers', component: DashboardCustomerPage },  // ✅ matches sidebar link
      { path: 'orders',    component: DashboardOrderPage },
      { path: 'products',   component: DashboardProductPage }
    ]
  },
  { path: '**', component: Notfound }
];
