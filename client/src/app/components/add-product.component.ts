import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="min-h-screen bg-slate-100 p-6">
  <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <h1 class="text-4xl font-black text-slate-900">
        {{ isEditMode ? 'Edit Product' : 'Add Product' }}
      </h1>
      <p class="text-slate-500 mt-2">
        {{ isEditMode ? 'Update product information.' : 'Create a new inventory item.' }}
      </p>
    </div>
    <button
      (click)="goBack()"
      class="rounded-2xl border border-slate-300 bg-white px-6 py-4 text-slate-700 font-bold shadow-sm transition hover:bg-slate-50"
    >
      ← Back to Products
    </button>
  </div>

  <div class="rounded-3xl bg-white p-8 shadow-xl">
    <form (ngSubmit)="submitProduct()" class="space-y-6">
      <div>
        <label class="mb-2 block text-sm font-black text-slate-700">Product Name</label>
        <input
          type="text"
          [(ngModel)]="product.name"
          name="name"
          required
          class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition focus:border-indigo-500"
        />
      </div>

      <div>
        <label class="mb-2 block text-sm font-black text-slate-700">Description</label>
        <textarea
          [(ngModel)]="product.description"
          name="description"
          rows="4"
          class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition focus:border-indigo-500"
        ></textarea>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <div>
          <label class="mb-2 block text-sm font-black text-slate-700">Category</label>
          <select
            [(ngModel)]="product.category"
            name="category"
            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition focus:border-indigo-500"
          >
            <option>Gadgets</option>
            <option>Fashion</option>
            <option>Electricity</option>
            <option>Home</option>
            <option>Sports</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label class="mb-2 block text-sm font-black text-slate-700">Price</label>
          <input
            type="number"
            [(ngModel)]="product.price"
            name="price"
            min="0"
            required
            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition focus:border-indigo-500"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-black text-slate-700">Quantity</label>
          <input
            type="number"
            [(ngModel)]="product.quantity"
            name="quantity"
            min="0"
            required
            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition focus:border-indigo-500"
          />
        </div>
      </div>

      <div>
        <label class="mb-2 block text-sm font-black text-slate-700">Product Image</label>
        <input
          type="file"
          (change)="onFileSelected($event)"
          accept="image/*"
          class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition focus:border-indigo-500"
        />
      </div>

      <div class="flex flex-col gap-4 pt-4 md:flex-row">
        <button
          type="submit"
          class="flex-1 rounded-2xl bg-indigo-600 py-4 text-lg font-black text-white shadow-lg transition hover:scale-[1.02] hover:bg-indigo-700"
        >
          {{ isEditMode ? 'Update Product' : 'Save Product' }}
        </button>
        <button
          type="button"
          (click)="goBack()"
          class="flex-1 rounded-2xl border border-slate-200 bg-slate-100 py-4 text-lg font-black text-slate-800 shadow-sm transition hover:bg-slate-200"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>
  `
})
export class AddProductComponent implements OnInit {
  selectedFile: File | null = null;
  isEditMode = false;
  productId: number | null = null;

  product = {
    name: '',
    description: '',
    category: 'Gadgets',
    price: 0,
    quantity: 1
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.productId = Number(idParam);
      if (!isNaN(this.productId)) {
        this.isEditMode = true;
        this.loadProduct();
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  loadProduct(): void {
    if (!this.productId) {
      return;
    }

    this.productService.getProduct(this.productId).subscribe({
      next: (product: any) => {
        this.product = {
          name: product.name || '',
          description: product.description || '',
          category: product.category || 'Gadgets',
          price: product.price || 0,
          quantity: product.quantity || 1
        };
      },
      error: (err) => {
        console.error('Failed to load product for edit', err);
        alert('Unable to load product.');
        this.router.navigate(['/products']);
      }
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  submitProduct(): void {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description || '');
    formData.append('category', this.product.category);
    formData.append('price', this.product.price.toString());
    formData.append('quantity', this.product.quantity.toString());

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    const request$ = this.isEditMode && this.productId
      ? this.productService.updateProduct(this.productId, formData)
      : this.productService.createProduct(formData);

    request$.subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error(this.isEditMode ? 'Update product failed' : 'Add product failed', err);
        alert('Failed to save product. Please try again.');
      }
    });
  }
}
