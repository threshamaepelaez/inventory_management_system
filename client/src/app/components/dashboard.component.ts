import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <h1 class="text-3xl font-semibold">Dashboard</h1>

      <div class="grid gap-6 md:grid-cols-4">

        <div class="rounded-3xl bg-indigo-600 p-6 text-white shadow">
          <p class="text-sm uppercase tracking-wider">
            Total Products
          </p>

          <h2 class="mt-3 text-4xl font-bold">
            {{ totalProducts }}
          </h2>
        </div>

        <div class="rounded-3xl bg-amber-500 p-6 text-white shadow">
          <p class="text-sm uppercase tracking-wider">
            Low Stock
          </p>

          <h2 class="mt-3 text-4xl font-bold">
            {{ lowStock }}
          </h2>
        </div>

        <div class="rounded-3xl bg-rose-500 p-6 text-white shadow">
          <p class="text-sm uppercase tracking-wider">
            Out Of Stock
          </p>

          <h2 class="mt-3 text-4xl font-bold">
            {{ outOfStock }}
          </h2>
        </div>

        <div class="rounded-3xl bg-slate-900 p-6 text-white shadow">
          <p class="text-sm uppercase tracking-wider">
            Recent Products
          </p>

          <h2 class="mt-3 text-4xl font-bold">
            {{ recentProducts.length }}
          </h2>
        </div>

      </div>

      <div class="rounded-3xl bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-semibold">
          Recent products
        </h2>

        <div
          *ngIf="recentProducts.length === 0"
          class="text-slate-500"
        >
          No products found.
        </div>

        <div
          *ngFor="let product of recentProducts"
          class="flex items-center justify-between border-b py-3"
        >
          <div>
            <p class="font-medium">
              {{ product.name }}
            </p>

            <p class="text-sm text-slate-500">
              {{ product.description }}
            </p>
          </div>

          <div class="text-right">
            <p class="font-semibold">
              ₱ {{ product.price }}
            </p>

            <p class="text-sm text-slate-500">
              Qty: {{ product.quantity }}
            </p>
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