import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="rounded-3xl bg-slate-50 p-6 shadow-sm">
      <h2 class="mb-4 text-2xl font-semibold">{{ product ? 'Edit product' : 'Create product' }}</h2>
      <form [formGroup]="productForm" (ngSubmit)="save()" class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2">
          <label class="block">
            <span class="text-sm font-medium text-slate-700">Name</span>
            <input formControlName="name" type="text" class="mt-2 w-full" />
          </label>
          <label class="block">
            <span class="text-sm font-medium text-slate-700">Price</span>
            <input formControlName="price" type="number" class="mt-2 w-full" />
          </label>
        </div>
        <label class="block">
          <span class="text-sm font-medium text-slate-700">Description</span>
          <textarea formControlName="description" rows="4" class="mt-2 w-full"></textarea>
        </label>
        <div class="grid gap-4 md:grid-cols-2">
          <label class="block">
            <span class="text-sm font-medium text-slate-700">Quantity</span>
            <input formControlName="quantity" type="number" class="mt-2 w-full" />
          </label>
          <label class="block">
            <span class="text-sm font-medium text-slate-700">Image</span>
            <input type="file" (change)="changeFile($event)" class="mt-2 w-full" />
          </label>
        </div>
        <div *ngIf="preview" class="rounded-3xl border border-slate-200 p-3">
          <p class="text-sm text-slate-500">Preview</p>
          <img [src]="preview" alt="Preview" class="mt-2 h-48 w-full rounded-3xl object-cover" />
        </div>
        <div class="flex gap-3">
          <button type="submit" class="rounded-2xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700">{{ product ? 'Update' : 'Create' }}</button>
          <button type="button" (click)="cancel.emit()" class="rounded-2xl bg-slate-200 px-6 py-3 text-slate-700 hover:bg-slate-300">Cancel</button>
        </div>
      </form>
    </div>
  `
})
export class ProductFormComponent implements OnChanges {
  @Input() product: Product | null = null;
  @Output() saved = new EventEmitter<{ product: Partial<Product>; file?: File }>();
  @Output() cancel = new EventEmitter<void>();

  preview = '';
  file?: File;

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(0)])
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes.product && this.product) {
      this.productForm.patchValue({
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        quantity: this.product.quantity
      });
      this.preview = this.product.image || '';
    }
  }

  changeFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.preview = reader.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }

  save() {
    if (this.productForm.invalid) {
      return;
    }
    this.saved.emit({ product: this.productForm.value, file: this.file });
  }
}
