import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="bg-white border-b border-slate-200">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-3 text-slate-900">
          <span class="text-xl font-semibold">Inventory System</span>
        </div>
        <div class="flex items-center gap-4">
          <a routerLink="/dashboard" class="text-sm font-medium text-slate-600 hover:text-slate-900">Dashboard</a>
          <a routerLink="/products" class="text-sm font-medium text-slate-600 hover:text-slate-900">Products</a>
          <button
            *ngIf="authService.isAuthenticated()"
            (click)="logout()"
            class="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  `
})
export class NavbarComponent {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
