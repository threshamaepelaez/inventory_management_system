import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-8">
      <div class="text-center">
        <h1 class="text-4xl font-black tracking-tight text-slate-800">
          Dashboard Overview
        </h1>
        <p class="mt-2 text-slate-500">
          Monitor your inventory at a glance.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div class="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 p-8 text-white shadow-2xl transition hover:scale-105">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm uppercase tracking-wider opacity-90">
                  Total Products
                </p>
                <h2 class="mt-2 text-4xl font-black">
                  {{ totalProducts }}
                </h2>
              </div>
              <div class="rounded-2xl bg-white/20 p-3">
                <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-8 text-white shadow-2xl transition hover:scale-105">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm uppercase tracking-wider opacity-90">
                  Low Stock
                </p>
                <h2 class="mt-2 text-4xl font-black">
                  {{ lowStock }}
                </h2>
              </div>
              <div class="rounded-2xl bg-white/20 p-3">
                <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600 p-8 text-white shadow-2xl transition hover:scale-105">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm uppercase tracking-wider opacity-90">
                  Out Of Stock
                </p>
                <h2 class="mt-2 text-4xl font-black">
                  {{ outOfStock }}
                </h2>
              </div>
              <div class="rounded-2xl bg-white/20 p-3">
                <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-.966-5.618-2.479C5.668 11.562 5 10.125 5 8.5 5 4.358 8.134 1 12 1s7 3.358 7 7.5c0 1.625-.668 3.062-1.382 4.021C16.29 14.034 14.34 15 12 15z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-8 text-white shadow-2xl transition hover:scale-105">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm uppercase tracking-wider opacity-90">
                  Recent Products
                </p>
                <h2 class="mt-2 text-4xl font-black">
                  {{ recentProducts.length }}
                </h2>
              </div>
              <div class="rounded-2xl bg-white/20 p-3">
                <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div class="border-b bg-slate-50 px-8 py-6">
          <h2 class="text-2xl font-bold text-slate-800">
            Recent Products
          </h2>
          <p class="mt-1 text-slate-500">
            Latest additions to your inventory.
          </p>
        </div>

        <div class="p-8">
          <div
            *ngIf="recentProducts.length === 0"
            class="text-center py-12 text-slate-500"
          >
            <svg class="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-5.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
            </svg>
            <p class="mt-4 text-lg">No products found.</p>
            <p class="text-sm">Start by adding your first product.</p>
          </div>

          <div class="space-y-4">
            <div
              *ngFor="let product of recentProducts"
              class="flex items-center justify-between rounded-2xl border border-slate-100 bg-gradient-to-r from-white to-slate-50 p-6 shadow-sm transition hover:shadow-md"
            >
              <div class="flex items-center gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 font-bold text-white">
                  {{ product.name.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <p class="font-bold text-slate-800">
                    {{ product.name }}
                  </p>
                  <p class="text-sm text-slate-500">
                    {{ product.description || 'No description' }}
                  </p>
                </div>
              </div>

              <div class="text-right">
                <p class="text-2xl font-black text-slate-800">
                  ₱ {{ product.price }}
                </p>
                <p class="text-sm text-slate-500">
                  Qty: {{ product.quantity }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {

  totalProducts = 0;
  lowStock = 0;
  outOfStock = 0;

  recentProducts: Product[] = [];

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    this.productService
      .getProducts()
      .subscribe({

        next: (response: any) => {

          const items: Product[] =
            response.items || response || [];

          this.totalProducts = items.length;

          this.lowStock = items.filter(
            (item) =>
              item.quantity > 0 &&
              item.quantity <= 5
          ).length;

          this.outOfStock = items.filter(
            (item) =>
              item.quantity === 0
          ).length;

          this.recentProducts =
            items.slice(0, 5);
        },

        error: (error) => {
          console.error(
            'Dashboard load error:',
            error
          );
        }
      });
  }
}