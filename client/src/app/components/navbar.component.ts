import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-3">
          <span class="text-2xl">📦</span>
          <span class="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Inventory System</span>
        </div>
        <nav class="hidden md:flex items-center gap-8">
          <a routerLink="/dashboard" class="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">Dashboard</a>
          <a routerLink="/products" class="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">Products</a>
          <button
            *ngIf="authService.isAuthenticated()"
            (click)="logout()"
            class="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white hover:shadow-lg transition"
          >
            Logout
          </button>
        </nav>
        <div class="md:hidden">
          <button
            *ngIf="authService.isAuthenticated()"
            (click)="logout()"
            class="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-2 text-xs font-semibold text-white"
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
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
