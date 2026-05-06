import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <aside class="rounded-3xl bg-slate-900 p-6 text-white shadow-lg shadow-slate-200/10">
      <h2 class="mb-4 text-lg font-semibold">Navigation</h2>
      <nav class="space-y-3 text-sm">
        <a routerLink="/dashboard" class="block rounded-2xl px-4 py-3 hover:bg-slate-800">Dashboard</a>
        <a routerLink="/products" class="block rounded-2xl px-4 py-3 hover:bg-slate-800">Products</a>
        <a routerLink="/admin/products" class="block rounded-2xl px-4 py-3 hover:bg-slate-800">Admin</a>
      </nav>
    </aside>
  `
})
export class SidebarComponent {}
