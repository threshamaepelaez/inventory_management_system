import { Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { ProductsComponent } from './components/products.component';
import { ProductDetailsComponent } from './components/product-details.component';
import { AdminProductsComponent } from './components/admin-products.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/:id', component: ProductDetailsComponent },
      { path: 'admin/products', component: AdminProductsComponent }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
