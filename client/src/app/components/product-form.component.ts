import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],

  template: `

  <div class="space-y-4">

    <h2 class="text-2xl font-bold">

      {{ product ? 'Edit Product' : 'Create Product' }}

    </h2>

    <!-- NAME -->
    <div>

      <label>Name</label>

      <input
        type="text"
        [(ngModel)]="form.name"
        name="name"
        class="w-full border p-3 rounded"
      />

    </div>

    <!-- DESCRIPTION -->
    <div>

      <label>Description</label>

      <textarea
        [(ngModel)]="form.description"
        name="description"
        class="w-full border p-3 rounded"
      ></textarea>

    </div>

    <!-- PRICE -->
    <div>

      <label>Price</label>

      <input
        type="number"
        [(ngModel)]="form.price"
        name="price"
        class="w-full border p-3 rounded"
      />

    </div>

    <!-- QUANTITY -->
    <div>

      <label>Quantity</label>

      <input
        type="number"
        [(ngModel)]="form.quantity"
        name="quantity"
        class="w-full border p-3 rounded"
      />

    </div>

    <!-- IMAGE -->
    <div>

      <label>Image</label>

      <input
        type="file"
        (change)="onFileSelected($event)"
        accept="image/*"
        class="w-full border p-3 rounded"
      />

      <p class="text-sm text-gray-500 mt-1">
        {{ selectedFile ? selectedFile.name : 'No file selected' }}
      </p>

    </div>

    <!-- BUTTONS -->
    <div class="flex gap-3">

      <button
        type="button"
        (click)="submitForm()"
        class="bg-blue-600 text-white px-6 py-3 rounded"
      >
        {{ product ? 'Update' : 'Create' }}
      </button>

      <button
        type="button"
        (click)="cancel.emit()"
        class="bg-gray-300 px-6 py-3 rounded"
      >
        Cancel
      </button>

    </div>

  </div>

  `
})
export class ProductFormComponent implements OnInit, OnChanges {

  @Input() product: any;

  @Output() saved =
    new EventEmitter<any>();

  @Output() cancel =
    new EventEmitter<void>();

  form = {
    name: '',
    description: '',
    price: 0,
    quantity: 0
  };

  selectedFile: File | null = null;

  ngOnInit(): void {
    this.syncFormWithProduct();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.syncFormWithProduct();
    }
  }

  private syncFormWithProduct(): void {
    if (this.product) {
      this.form = {
        name: this.product.name || '',
        description: this.product.description || '',
        price: this.product.price || 0,
        quantity: this.product.quantity || 0
      };
    } else {
      this.form = {
        name: '',
        description: '',
        price: 0,
        quantity: 0
      };
      this.selectedFile = null;
    }
  }

  onFileSelected(event: any): void {

    const file = event.target.files[0];

    if (file) {

      this.selectedFile = file;
    }
  }

  submitForm(): void {

    console.log('FORM DATA:', this.form);

    this.saved.emit({
      product: this.form,
      file: this.selectedFile
    });
  }

}