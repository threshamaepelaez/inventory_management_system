import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <h1 class="text-3xl font-semibold">Dashboard</h1>
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div class="rounded-3xl bg-indigo-600 p-6 text-white shadow-lg">
          <h2 class="text-sm uppercase tracking-[0.2em]">Total Products</h2>
          <p class="mt-4 text-4xl font-bold">{{ totalProducts }}</p>
        </div>
        <div class="rounded-3xl bg-amber-500 p-6 text-white shadow-lg">
          <h2 class="text-sm uppercase tracking-[0.2em]">Low Stock</h2>
          <p class="mt-4 text-4xl font-bold">{{ lowStock }}</p>
        </div>
        <div class="rounded-3xl bg-rose-500 p-6 text-white shadow-lg">
          <h2 class="text-sm uppercase tracking-[0.2em]">Out of Stock</h2>
          <p class="mt-4 text-4xl font-bold">{{ outOfStock }}</p>
        </div>
        <div class="rounded-3xl bg-slate-800 p-6 text-white shadow-lg">
          <h2 class="text-sm uppercase tracking-[0.2em]">Recent Products</h2>
          <p class="mt-4 text-4xl font-bold">{{ recentProducts }}</p>
        </div>
      </div>
      <section class="rounded-3xl bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-semibold">Recent products</h2>
        <div *ngIf="products.length === 0" class="text-slate-500">No products found.</div>
        <ul *ngIf="products.length > 0" class="space-y-3">
          <li *ngFor="let product of products" class="rounded-3xl border border-slate-200 p-4 hover:border-indigo-500">
            <div class="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h3 class="text-lg font-semibold">{{ product.name }}</h3>
                <p class="text-sm text-slate-500">{{ product.description }}</p>
              </div>
              <div class="space-x-3 text-sm text-slate-600">
                <span>Qty: {{ product.quantity }}</span>
                <span>Price: ${{ product.price }}</span>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  totalProducts = 0;
  lowStock = 0;
  outOfStock = 0;
  recentProducts = 0;
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadMetrics();
  }

  loadMetrics() {
    this.productService.getProducts('', 1, 10).subscribe((response) => {
      this.totalProducts = response.meta.total;
      this.products = response.items.slice(0, 5);
      this.recentProducts = this.products.length;
      this.lowStock = response.items.filter((item) => item.quantity > 0 && item.quantity <= 5).length;
      this.outOfStock = response.items.filter((item) => item.quantity === 0).length;
    });
  }
}
