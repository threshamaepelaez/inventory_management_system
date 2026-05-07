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
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">IM</div>
        <div>
          <h1 class="font-bold text-xl text-slate-900 dark:text-white">Inventory MS</h1>
          <p class="text-sm text-slate-500">Smart Inventory System</p>
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