import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form.component';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  template: `
    <div class="space-y-6">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-3xl font-semibold">Admin Product Management</h1>
          <p class="text-sm text-slate-500">Create, edit, and delete inventory items.</p>
        </div>
        <button (click)="newProduct()" class="rounded-2xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700">Add Product</button>
      </div>

      <section *ngIf="showForm" class="rounded-3xl bg-white p-6 shadow-sm">
        <app-product-form [product]="activeProduct" (saved)="onSave($event)" (cancel)="cancelEdit()"></app-product-form>
      </section>

      <div class="overflow-x-auto rounded-3xl bg-white p-4 shadow-sm">
        <table class="min-w-full divide-y divide-slate-200 text-sm text-left text-slate-700">
          <thead class="border-b border-slate-200">
            <tr>
              <th class="px-4 py-3">Name</th>
              <th class="px-4 py-3">Quantity</th>
              <th class="px-4 py-3">Price</th>
              <th class="px-4 py-3">Image</th>
              <th class="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr *ngFor="let item of products">
              <td class="px-4 py-4">{{ item.name }}</td>
              <td class="px-4 py-4">{{ item.quantity }}</td>
              <td class="px-4 py-4">${{ item.price }}</td>
              <td class="px-4 py-4">{{ item.image ? 'Uploaded' : 'None' }}</td>
              <td class="px-4 py-4 space-x-2">
                <button (click)="editProduct(item)" class="rounded-2xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800">Edit</button>
                <button (click)="removeProduct(item.id)" class="rounded-2xl bg-rose-500 px-4 py-2 text-white hover:bg-rose-600">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  activeProduct: Product | null = null;
  showForm = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts('', 1, 20).subscribe((result) => (this.products = result.items));
  }

  newProduct() {
    this.activeProduct = null;
    this.showForm = true;
  }

  editProduct(product: Product) {
    this.activeProduct = product;
    this.showForm = true;
  }

  cancelEdit() {
    this.showForm = false;
    this.activeProduct = null;
  }

  onSave(event: { product: Partial<Product>; file?: File }) {
    if (this.activeProduct) {
      this.productService.updateProduct(this.activeProduct.id, event.product, event.file).subscribe(() => {
        this.showForm = false;
        this.loadProducts();
      });
    } else {
      this.productService.saveProduct(event.product, event.file).subscribe(() => {
        this.showForm = false;
        this.loadProducts();
      });
    }
  }

  removeProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }
}
