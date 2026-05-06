import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-3xl font-semibold">Products</h1>
          <p class="text-sm text-slate-500">Browse, search and filter inventory items.</p>
        </div>
        <form [formGroup]="searchForm" class="flex flex-col gap-3 sm:flex-row">
          <input formControlName="search" type="text" placeholder="Search products" class="rounded-2xl border-slate-300 px-4 py-3 shadow-sm" />
          <select formControlName="available" class="rounded-2xl border-slate-300 px-4 py-3 shadow-sm">
            <option value="">All stock</option>
            <option value="low">Low stock</option>
            <option value="out">Out of stock</option>
          </select>
          <button type="button" (click)="loadProducts()" class="rounded-2xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700">Search</button>
        </form>
      </div>
      <div class="overflow-x-auto rounded-3xl bg-white p-4 shadow-sm">
        <table class="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead class="border-b border-slate-200 text-slate-700">
            <tr>
              <th class="px-4 py-3">Name</th>
              <th class="px-4 py-3">Quantity</th>
              <th class="px-4 py-3">Price</th>
              <th class="px-4 py-3">Created</th>
              <th class="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 text-slate-600">
            <tr *ngFor="let product of products">
              <td class="px-4 py-4">{{ product.name }}</td>
              <td class="px-4 py-4">{{ product.quantity }}</td>
              <td class="px-4 py-4">${{ product.price }}</td>
              <td class="px-4 py-4">{{ product.created_at | date:'mediumDate' }}</td>
              <td class="px-4 py-4">
                <button (click)="viewProduct(product.id)" class="rounded-2xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-700">Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex items-center justify-between">
        <button (click)="previousPage()" class="rounded-2xl bg-slate-200 px-4 py-3 text-slate-700 hover:bg-slate-300">Previous</button>
        <p class="text-sm text-slate-500">Page {{ page }} / {{ totalPages }}</p>
        <button (click)="nextPage()" class="rounded-2xl bg-slate-200 px-4 py-3 text-slate-700 hover:bg-slate-300">Next</button>
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl(''),
    available: new FormControl('')
  });
  products: Product[] = [];
  page = 1;
  totalPages = 1;
  limit = 10;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    const search = this.searchForm.value.search || '';
    const available = this.searchForm.value.available || '';
    this.productService.getProducts(search, this.page, this.limit, available).subscribe((result) => {
      this.products = result.items;
      this.totalPages = Math.max(1, Math.ceil(result.meta.total / this.limit));
    });
  }

  viewProduct(id: number) {
    this.router.navigate(['/products', id]);
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page += 1;
      this.loadProducts();
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page -= 1;
      this.loadProducts();
    }
  }
}
