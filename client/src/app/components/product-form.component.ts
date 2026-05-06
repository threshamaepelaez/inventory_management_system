import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],

  template: `
  <div class="space-y-6">

    <h2 class="text-3xl font-bold text-slate-800">
      {{ product ? 'Edit Product' : 'Create Product' }}
    </h2>

    <div class="grid gap-6 md:grid-cols-2">

      <!-- NAME -->
      <div>
        <label class="mb-2 block font-semibold text-slate-700">
          Product Name
        </label>

        <input
          id="productName"
          name="productName"
          type="text"
          [(ngModel)]="form.name"
          class="w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-indigo-500"
          placeholder="Enter product name"
        />
      </div>

      <!-- PRICE -->
      <div>
        <label class="mb-2 block font-semibold text-slate-700">
          Price
        </label>

        <input
          id="price"
          name="price"
          type="number"
          [(ngModel)]="form.price"
          class="w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-indigo-500"
          placeholder="Enter price"
        />
      </div>

    </div>

    <!-- DESCRIPTION -->
    <div>

      <label class="mb-2 block font-semibold text-slate-700">
        Description
      </label>

      <textarea
        id="description"
        name="description"
        [(ngModel)]="form.description"
        rows="5"
        class="w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-indigo-500"
        placeholder="Enter description"
      >
      </textarea>

    </div>

    <div class="grid gap-6 md:grid-cols-2">

      <!-- QUANTITY -->
      <div>

        <label class="mb-2 block font-semibold text-slate-700">
          Quantity
        </label>

        <input
          id="quantity"
          name="quantity"
          type="number"
          [(ngModel)]="form.quantity"
          class="w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-indigo-500"
          placeholder="Enter quantity"
        />

      </div>

      <!-- IMAGE -->
      <div>

        <label class="mb-2 block font-semibold text-slate-700">
          Image
        </label>

        <input
          id="image"
          name="image"
          type="file"
          (change)="onFileSelected($event)"
          class="w-full rounded-2xl border border-slate-300 px-4 py-4"
        />

      </div>

    </div>

    <!-- BUTTONS -->
    <div class="flex gap-4">

      <button
        type="button"
        (click)="submitForm()"
        class="cursor-pointer rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-bold text-white shadow-xl transition hover:scale-105"
      >
        {{ product ? 'Update Product' : 'Create Product' }}
      </button>

      <button
        type="button"
        (click)="cancel.emit()"
        class="cursor-pointer rounded-2xl bg-slate-200 px-8 py-4 font-bold text-slate-700"
      >
        Cancel
      </button>

    </div>

  </div>
  `
})
export class ProductFormComponent {

  @Input() product: any;

  @Output() saved = new EventEmitter<any>();

  @Output() cancel = new EventEmitter<void>();

  selectedFile?: File;

  form = {
    name: '',
    description: '',
    price: 0,
    quantity: 0
  };

  ngOnInit(): void {

    if (this.product) {

      this.form = {
        name: this.product.name || '',
        description: this.product.description || '',
        price: this.product.price || 0,
        quantity: this.product.quantity || 0
      };
    }
  }

  onFileSelected(event: any): void {

    if (event.target.files.length > 0) {

      this.selectedFile = event.target.files[0];
    }
  }

  submitForm(): void {

    console.log('FORM SUBMITTED');

    console.log(this.form);

    this.saved.emit({
      product: this.form,
      file: this.selectedFile
    });
  }
}