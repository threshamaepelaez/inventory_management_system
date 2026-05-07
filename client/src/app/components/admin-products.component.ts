import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFormComponent } from './product-form.component';
import { ProductService } from '../services/product.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFormComponent],

  styles: [`
    button {
      pointer-events: auto !important;
      cursor: pointer !important;
      position: relative;
      z-index: 10;
    }
  `],

  template: `
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 p-6">

    <div class="mx-auto max-w-7xl space-y-8">

      <!-- HEADER -->
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 class="text-4xl font-black tracking-tight text-slate-800">
            Inventory Management
          </h1>

          <p class="mt-2 text-slate-500">
            Manage products beautifully.
          </p>
        </div>

        <button
          type="button"
          (click)="newProduct()"
          class="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 font-semibold text-white shadow-xl transition hover:scale-105"
        >
          + Add Product
        </button>

      </div>

      <!-- FORM -->
      <section
        *ngIf="showForm"
        class="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl"
      >

        <app-product-form
          [product]="activeProduct"
          (saved)="onSave($event)"
          (cancel)="cancelEdit()"
        >
        </app-product-form>

      </section>

      <!-- TABLE -->
      <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

        <div class="border-b bg-slate-50 px-6 py-5">
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 class="text-xl font-bold text-slate-800">
              Product Inventory
            </h2>

            <div class="flex items-center gap-4">
              <input
                type="text"
                [(ngModel)]="searchTerm"
                placeholder="Search products..."
                class="rounded-xl border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">

          <table class="min-w-full">

            <thead class="bg-slate-100 text-slate-700">

              <tr>
                <th class="px-6 py-4 text-left font-semibold">Product</th>
                <th class="px-6 py-4 text-left font-semibold">Quantity</th>
                <th class="px-6 py-4 text-left font-semibold">Price</th>
                <th class="px-6 py-4 text-left font-semibold">Image</th>
                <th class="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>

            </thead>

            <tbody>

              <tr
                *ngFor="let item of filteredProducts"
                class="border-b transition hover:bg-indigo-50"
              >

                <!-- PRODUCT -->
                <td class="px-6 py-5">

                  <div class="flex items-center gap-4">

                    <div
                      class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 font-bold text-white"
                    >
                      {{ item.name.charAt(0).toUpperCase() }}
                    </div>

                    <div>

                      <p class="font-bold text-slate-800">
                        {{ item.name }}
                      </p>

                      <p class="text-sm text-slate-400">
                        Inventory Item
                      </p>

                    </div>

                  </div>

                </td>

                <!-- QUANTITY -->
                <td class="px-6 py-5">

                  <span
                    class="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700"
                  >
                    {{ item.quantity }}
                  </span>

                </td>

                <!-- PRICE -->
                <td class="px-6 py-5 font-semibold text-slate-700">
                  ₱ {{ item.price }}
                </td>

                <!-- IMAGE -->
                <td class="px-6 py-5">

                  <img
                    *ngIf="item.image"
                    [src]="item.image"
                    class="h-16 w-16 rounded-2xl object-cover"
                  />

                  <span
                    *ngIf="!item.image"
                    class="text-slate-400"
                  >
                    No Image
                  </span>

                </td>

                <!-- ACTIONS -->
                <td class="px-6 py-5">

                  <div class="flex gap-3">

                    <button
                      type="button"
                      (click)="editProduct(item)"
                      class="rounded-xl bg-slate-900 px-5 py-2 font-medium text-white"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      (click)="removeProduct(item.id)"
                      class="rounded-xl bg-rose-500 px-5 py-2 font-medium text-white"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

              <!-- EMPTY -->
              <tr *ngIf="filteredProducts.length === 0">

                <td
                  colspan="5"
                  class="px-6 py-16 text-center text-slate-400"
                >
                  {{ searchTerm ? 'No products match your search.' : 'No products found.' }}
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>

  </div>
  `
})
export class AdminProductsComponent implements OnInit {

  products: any[] = [];
  activeProduct: any = null;
  showForm = false;
  searchTerm = '';

  constructor(
    private productService: ProductService
  ) {}

  get filteredProducts(): any[] {
    if (!this.searchTerm) {
      return this.products;
    }

    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {

    this.productService
      .getProducts()
      .subscribe({

        next: (response: any) => {

          const rawProducts = Array.isArray(response)
            ? response
            : response.items ||
              response.products ||
              [];

          this.products = rawProducts.map((item: any) => {
            const normalized = this.normalizeProduct(item);
            return {
              ...normalized,
              image: this.buildImageUrl(normalized.image)
            };
          });
        },

        error: (error: any) => {
          console.error('LOAD ERROR:', error);
        }
      });
  }

  private buildImageUrl(image: string | null): string | null {
    if (!image) {
      return null;
    }

    if (image.startsWith('http')) {
      return image;
    }

    return `${environment.apiUrl.replace(/\/api$/, '')}/uploads/${image}`;
  }

  private normalizeProduct(item: any): any {
    const findKey = (keys: string[]) => keys.find(key => item[key] !== undefined && item[key] !== null);

    const nameKey = findKey(['name', 'product_name', 'title', 'Name', 'productName', 'productTitle']);
    const quantityKey = findKey(['quantity', 'stock', 'qty', 'Quantity', 'stock_quantity', 'qty_count']);
    const priceKey = findKey(['price', 'product_price', 'amount', 'Price', 'cost']);
    const imageKey = findKey(['image', 'image_url', 'Image', 'imageUrl']);
    const idKey = findKey(['id', 'product_id', 'ID']);

    return {
      id: item[idKey ?? 'id'] ?? null,
      name: nameKey ? item[nameKey] : 'Product',
      quantity: quantityKey ? item[quantityKey] : 0,
      price: priceKey ? item[priceKey] : 0,
      image: imageKey ? item[imageKey] : null
    };
  }

  newProduct(): void {

    this.activeProduct = null;
    this.showForm = true;
  }

  editProduct(product: any): void {

    this.activeProduct = product;
    this.showForm = true;
  }

  cancelEdit(): void {

    this.showForm = false;
    this.activeProduct = null;
  }

  onSave(event: { product: any; file?: File }): void {

    if (this.activeProduct) {

      this.productService
        .updateProduct(
          this.activeProduct.id,
          event.product,
          event.file
        )
        .subscribe({

          next: (response: any) => {

            this.showForm = false;
            this.activeProduct = null;

            this.loadProducts();
          },

          error: (error: any) => {
            console.error('UPDATE ERROR:', error);
          }
        });

    } else {

      this.productService
        .saveProduct(
          event.product,
          event.file
        )
        .subscribe({

          next: (response: any) => {

            this.loadProducts();
          },

          error: (error: any) => {
            console.error('CREATE ERROR:', error);
          }
        });
    }
  }

  removeProduct(id: number): void {

    const confirmDelete = confirm(
      'Delete this product?'
    );

    if (!confirmDelete) {
      return;
    }

    this.productService
      .deleteProduct(id)
      .subscribe({

        next: () => {

          this.loadProducts();
        },

        error: (error: any) => {
          console.error('DELETE ERROR:', error);
        }
      });
  }
}