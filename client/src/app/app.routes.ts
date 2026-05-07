import { Routes } from '@angular/router';

import { LoginComponent } from './components/login.component';

import { RegisterComponent } from './components/register.component';

import { DashboardComponent } from './components/dashboard.component';

import { AdminProductsComponent } from './components/admin-products.component';

import { ProductDetailsComponent } from './components/product-details.component';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./components/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'products',
    component: AdminProductsComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent
  }
];