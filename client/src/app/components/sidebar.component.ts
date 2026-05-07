import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <aside class="hidden lg:block rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-lg h-fit sticky top-24">
      <h2 class="mb-6 text-lg font-bold flex items-center gap-2">
        <span>🗂️</span>
        Navigation
      </h2>
      <nav class="space-y-2 text-sm">
        <a routerLink="/dashboard" 
           routerLinkActive="bg-indigo-600 text-white" 
           [routerLinkActiveOptions]="{ exact: true }"
           class="flex items-center gap-2 rounded-xl px-4 py-3 text-slate-200 hover:bg-slate-700 transition font-medium">
          <span>📊</span> Dashboard
        </a>
        <a routerLink="/products" 
           routerLinkActive="bg-indigo-600 text-white"
           [routerLinkActiveOptions]="{ exact: true }"
           class="flex items-center gap-2 rounded-xl px-4 py-3 text-slate-200 hover:bg-slate-700 transition font-medium">
          <span>📦</span> Products
        </a>
        <a routerLink="/admin/products" 
           routerLinkActive="bg-indigo-600 text-white"
           [routerLinkActiveOptions]="{ exact: true }"
           class="flex items-center gap-2 rounded-xl px-4 py-3 text-slate-200 hover:bg-slate-700 transition font-medium">
          <span>⚙️</span> Admin
        </a>
      </nav>
    </aside>
  `
})
export class SidebarComponent {}
