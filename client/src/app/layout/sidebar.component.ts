import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <div class="h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col p-6 shadow-sm w-[250px]">
      <!-- LOGO -->
      <div class="flex items-center gap-4 mb-12">
        <div class="w-14 h-14 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-600 to-violet-500 p-3 shadow-2xl">
          <svg viewBox="0 0 64 64" class="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="20" width="40" height="28" rx="7" fill="white" />
            <path d="M12 20L32 8L52 20" stroke="#4338ca" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M32 8V28" stroke="#4338ca" stroke-width="4" stroke-linecap="round" />
            <path d="M12 20L32 32L52 20" stroke="#4338ca" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div>
          <h1 class="font-bold text-xl text-slate-900 dark:text-white">Inventory Management System</h1>
          <p class="text-sm text-slate-500">Modern stock control</p>
        </div>
      </div>
      <!-- NAVIGATION -->
      <nav class="space-y-2">
        <a routerLink="/dashboard" routerLinkActive="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl scale-[1.03]" class="flex items-center gap-3 rounded-xl px-5 py-3 font-semibold transition duration-300 hover:bg-slate-100 hover:translate-x-2 dark:hover:bg-slate-800">
          <span class="text-lg">📊</span> Dashboard
        </a>
        <a routerLink="/products" routerLinkActive="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl scale-[1.03]" class="flex items-center gap-3 rounded-xl px-5 py-3 font-semibold transition duration-300 hover:bg-slate-100 hover:translate-x-2 dark:hover:bg-slate-800">
          <span class="text-lg">📦</span> Products
        </a>
      </nav>
      <button (click)="logout()" class="mt-auto w-full rounded-xl bg-red-500 px-5 py-3 text-white font-semibold transition-all duration-300 hover:bg-red-600 hover:scale-[1.02] shadow-lg shadow-red-500/20">Logout</button>
    </div>
  `
})
export class SidebarComponent {
  username = 'User';
  constructor(private authService: AuthService, private router: Router) {
    const user = this.authService.getStoredUser && this.authService.getStoredUser();
    if (user?.name) {
      this.username = user.name;
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}