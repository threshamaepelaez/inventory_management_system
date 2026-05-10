import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],

  template: `

<div class="relative min-h-screen bg-slate-100 p-6">

  <!-- HEADER -->
  <div class="mb-8">

    <button
  type="button"
  (click)="goBack()"
  class="relative z-50 mb-5 inline-flex items-center rounded-2xl bg-white px-5 py-3 text-slate-700 shadow transition hover:bg-slate-50"
  >
      ← Back to Products
    </button>

    <h1 class="text-4xl font-black text-slate-900">

      {{ isEditMode ? 'Edit Product' : 'Add Product' }}

    </h1>

    <p class="mt-2 text-slate-500">

      {{
        isEditMode
          ? 'Update product information.'
          : 'Create a new inventory item.'
      }}

    </p>

  </div>

  <!-- FORM -->
  <div class="rounded-3xl bg-white p-8 shadow-lg">

    <!-- PRODUCT NAME -->
    <div class="mb-6">

      <label class="mb-2 block text-lg font-bold text-slate-700">
        Product Name
      </label>

      <input
        type="text"
        [(ngModel)]="product.name"
        class="w-full rounded-2xl border px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter product name"
      />

    </div>

    <!-- DESCRIPTION -->
    <div class="mb-6">

      <label class="mb-2 block text-lg font-bold text-slate-700">
        Description
      </label>

      <textarea
        [(ngModel)]="product.description"
        rows="5"
        class="w-full rounded-2xl border px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter product description"
      ></textarea>

    </div>

    <!-- CATEGORY / PRICE / QUANTITY -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">

      <!-- CATEGORY -->
      <div>

        <label class="mb-2 block text-lg font-bold text-slate-700">
          Category
        </label>

        <select
          [(ngModel)]="product.category"
          class="w-full rounded-2xl border px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Gadgets">Gadgets</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
          <option value="Office">Office</option>
        </select>

      </div>

      <!-- PRICE -->
      <div>

        <label class="mb-2 block text-lg font-bold text-slate-700">
          Price
        </label>

        <input
          type="number"
          [(ngModel)]="product.price"
          class="w-full rounded-2xl border px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

      </div>

      <!-- QUANTITY -->
      <div>

        <label class="mb-2 block text-lg font-bold text-slate-700">
          Quantity
        </label>

        <input
          type="number"
          [(ngModel)]="product.quantity"
          class="w-full rounded-2xl border px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

      </div>

    </div>

    <!-- IMAGE -->
    <div class="mt-6">

      <label class="mb-2 block text-lg font-bold text-slate-700">
        Product Image
      </label>

      <input
        type="file"
        (change)="onFileSelected($event)"
        class="w-full rounded-2xl border px-5 py-4"
      />

    </div>

    <!-- BUTTONS -->
    <div class="mt-8 flex flex-col gap-4 md:flex-row">

      <button
        type="button"
        (click)="saveProduct()"
        class="flex-1 rounded-2xl bg-indigo-600 py-4 text-lg font-bold text-white transition hover:bg-indigo-700"
      >

        {{ isEditMode ? 'Update Product' : 'Save Product' }}

      </button>

      <button
        type="button"
        (click)="goBack()"
        class="flex-1 rounded-2xl bg-slate-200 py-4 text-lg font-bold text-slate-700 transition hover:bg-slate-300"
      >
        Cancel
      </button>

    </div>

  </div>

</div>

`
})
export class ProductFormComponent implements OnInit {

  isEditMode = false;

  productId: number | null = null;

  selectedFile: File | null = null;

  userRole: string = '';

  product: any = {
    name: '',
    description: '',
    category: 'Gadgets',
    price: 0,
    quantity: 0
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const role = localStorage.getItem('role');

    if (role?.toLowerCase() !== 'admin') {
      this.router.navigate(['/products']);
      return;
    }

    this.userRole = role || '';

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEditMode = true;

      this.productId = Number(id);

      this.loadProduct();

    }

  }

  loadProduct(): void {

    if (!this.productId) return;

    this.productService.getProduct(this.productId)
      .subscribe({

        next: (res: any) => {

          this.product = res;

        },

        error: (err) => {

          console.error(
            'Load product failed',
            err
          );

        }

      });

  }

  onFileSelected(event: any): void {

    const file =
      event.target.files[0];

    if (file) {

      this.selectedFile = file;

    }

  }

  saveProduct(): void {

    const formData = new FormData();

    formData.append(
      'name',
      this.product.name
    );

    formData.append(
      'description',
      this.product.description
    );

    formData.append(
      'category',
      this.product.category
    );

    formData.append(
      'price',
      this.product.price
    );

    formData.append(
      'quantity',
      this.product.quantity
    );

    if (this.selectedFile) {

      formData.append(
        'image',
        this.selectedFile
      );

    }

    // EDIT
    if (this.isEditMode && this.productId) {

      this.productService.updateProduct(
        this.productId,
        formData
      ).subscribe({

        next: () => {

          alert('Product updated');

          this.router.navigate(['/products']);

        },

        error: (err) => {

          console.error(
            'Update failed',
            err
          );

          alert('Update failed');

        }

      });

    }

    // ADD
    else {

      this.productService.createProduct(formData)
        .subscribe({

          next: () => {

            alert('Product added');

            this.router.navigate(['/products']);

          },

          error: (err) => {

            console.error(
              'Add product failed',
              err
            );

            alert(
              'Failed to save product. Please try again.'
            );

          }

        });

    }

  }

  goBack(): void {

    this.router.navigate(['/products']);

  }

}