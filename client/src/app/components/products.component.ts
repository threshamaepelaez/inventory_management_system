import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],

  template: `

<div class="min-h-screen bg-slate-100 p-6">

  <!-- HEADER -->
  <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

    <div>

      <!-- BACK BUTTON -->
      <button
        type="button"
        (click)="goBack()"
        class="mb-4 inline-flex items-center rounded-2xl bg-white px-4 py-3 text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        ← Back to dashboard
      </button>

      <h1 class="text-4xl font-black text-slate-900">
        Products
      </h1>

      <p class="mt-1 text-slate-500">
        Browse inventory and manage stock.
      </p>

      <!-- LOW STOCK FILTER -->
      <div
        *ngIf="lowStockFilter"
        class="mt-3 rounded-2xl bg-amber-100 p-4 text-amber-700"
      >

        Showing low stock products only.

        <button
          type="button"
          (click)="clearFilter()"
          class="font-bold underline"
        >
          Clear filter
        </button>

      </div>

    </div>

    <!-- ADD PRODUCT BUTTON -->
    <button
      *ngIf="userRole === 'admin'"
      type="button"
      (click)="openAddProduct()"
      class="rounded-2xl bg-indigo-600 px-6 py-4 font-bold text-white shadow-lg transition hover:bg-indigo-700"
    >
      + Add Product
    </button>

  </div>

  <!-- SEARCH -->
  <div class="mb-6 rounded-2xl bg-white p-4 shadow-sm">

    <input
      type="text"
      [(ngModel)]="searchTerm"
      (input)="searchProducts()"
      placeholder="Search product or category..."
      class="w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
    />

  </div>

  <!-- EMPTY -->
  <div
    *ngIf="filteredProducts.length === 0"
    class="rounded-3xl bg-white p-20 text-center shadow"
  >

    <div class="mb-4 text-7xl">
      📦
    </div>

    <h2 class="text-3xl font-black text-slate-800">
      No products found
    </h2>

    <p class="mt-3 text-slate-500">

      {{
        lowStockFilter
          ? 'There are no low stock products right now.'
          : 'Start by adding a new product.'
      }}

    </p>

  </div>

  <!-- PRODUCTS -->
  <div
    *ngIf="filteredProducts.length > 0"
    class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
  >

    <div
      *ngFor="let item of filteredProducts"
      class="rounded-3xl bg-white p-5 shadow-lg"
    >

      <!-- IMAGE -->
      <img
        *ngIf="item.imageUrl"
        [src]="item.imageUrl"
        class="h-52 w-full rounded-2xl object-cover"
      />

      <div
        *ngIf="!item.imageUrl"
        class="flex h-52 w-full items-center justify-center rounded-2xl bg-slate-200 text-6xl"
      >
        📦
      </div>

      <!-- INFO -->
      <h2 class="mt-4 text-2xl font-black text-slate-800">
        {{ item.name }}
      </h2>

      <p class="mt-2 text-slate-500">
        {{ item.description }}
      </p>

      <div class="mt-4 flex flex-wrap items-center justify-between gap-3">

        <span class="text-xl font-black text-indigo-600">
          ₱{{ item.price }}
        </span>

        <span class="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold">
          Qty: {{ item.quantity }}
        </span>

      </div>

      <!-- ADMIN BUTTONS -->
      <div
        *ngIf="userRole === 'admin'"
        class="mt-5 flex flex-wrap gap-3"
      >

        <!-- EDIT -->
        <button
          type="button"
          (click)="editProduct(item.id)"
          class="flex-1 rounded-xl bg-indigo-600 py-3 font-bold text-white transition hover:bg-indigo-700"
        >
          Edit
        </button>

        <!-- DELETE -->
        <button
          type="button"
          (click)="deleteProduct(item.id)"
          class="flex-1 rounded-xl bg-red-500 py-3 font-bold text-white transition hover:bg-red-600"
        >
          Delete
        </button>

      </div>

    </div>

  </div>

</div>
`
})
export class ProductsComponent implements OnInit {

  userRole: string = '';

  products: any[] = [];

  filteredProducts: any[] = [];

  lowStockFilter = false;

  searchTerm = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.userRole =
      localStorage.getItem('role') || '';

    this.route.queryParams.subscribe((params) => {

      this.lowStockFilter =
        params['lowStock'] === 'true';

      this.loadProducts();

    });

  }

  loadProducts(): void {

    this.productService.getProducts().subscribe({

      next: (res: any) => {

        const items =
          Array.isArray(res)
            ? res
            : res.items || [];

        this.products = items.map((item: any) => ({

          ...item,

          imageUrl: item.image
            ? `${environment.apiUrl}/uploads/${item.image}`
            : null

        }));

        this.applyFilter();

      },

      error: (err) => {

        console.error(
          'Unable to load products',
          err
        );

        this.filteredProducts = [];

      }

    });

  }

  applyFilter(): void {

    if (this.lowStockFilter) {

      this.filteredProducts =
        this.products.filter(
          (item) => Number(item.quantity) <= 10
        );

    } else {

      this.filteredProducts = [...this.products];

    }

  }

  openAddProduct(): void {

    if (this.userRole !== 'admin') {

      alert('Access denied');

      return;

    }

    this.router.navigate(['/products/add']);

  }

  clearFilter(): void {

    this.router.navigate(['/products']);

  }

  deleteProduct(id: number): void {

    if (this.userRole !== 'admin') {

      alert('Access denied');

      return;

    }

    if (!confirm('Delete this product?')) {
      return;
    }

    this.productService.deleteProduct(id).subscribe({

      next: () => {

        this.loadProducts();

      },

      error: (err) => {

        console.error(
          'Delete failed',
          err
        );

        alert('Delete failed');

      }

    });

  }

  searchProducts(): void {

    const term =
      this.searchTerm?.trim().toLowerCase();

    this.applyFilter();

    if (term) {

      this.filteredProducts =
        this.filteredProducts.filter((item) => {

          const name =
            item.name?.toString().toLowerCase() || '';

          const description =
            item.description?.toString().toLowerCase() || '';

          const category =
            item.category?.toString().toLowerCase() || '';

          return (
            name.includes(term) ||
            description.includes(term) ||
            category.includes(term)
          );

        });

    }

  }

  editProduct(id: number): void {

    if (this.userRole !== 'admin') {

      alert('Access denied');

      return;

    }

    this.router.navigate([
      '/products',
      id,
      'edit'
    ]);

  }

  goBack(): void {

    this.router.navigate(['/dashboard']);

  }

}