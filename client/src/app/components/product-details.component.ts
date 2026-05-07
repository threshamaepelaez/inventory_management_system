import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule
  ],

  template: `

<div class="min-h-screen bg-slate-100 p-6">

  <div class="mx-auto max-w-5xl space-y-6">

    <!-- BACK BUTTON -->
    <button
      routerLink="/products"
      class="rounded-2xl bg-white px-5 py-3 text-slate-700 shadow hover:bg-slate-50"
    >
      ← Back to products
    </button>

    <!-- PRODUCT CARD -->
    <section
      *ngIf="product"
      class="rounded-3xl bg-white p-8 shadow-xl"
    >

      <div
        class="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]"
      >

        <!-- IMAGE -->
        <div>

          <img
            *ngIf="product.image"
            [src]="product.image"
            alt="Product image"
            class="h-80 w-full rounded-3xl object-cover"
          />

          <div
            *ngIf="!product.image"
            class="flex h-80 items-center justify-center rounded-3xl bg-slate-200 text-slate-500"
          >
            No Image
          </div>

        </div>

        <!-- DETAILS -->
        <div>

          <h1 class="text-4xl font-black text-slate-800">
            {{ product.name }}
          </h1>

          <p class="mt-4 text-lg text-slate-500">
            {{ product.description || 'No description available.' }}
          </p>

          <div class="mt-8 space-y-4">

            <div
              class="flex items-center justify-between rounded-2xl bg-slate-100 px-6 py-4"
            >

              <span class="font-semibold text-slate-600">
                Price
              </span>

              <span class="text-2xl font-bold text-emerald-600">
                ₱ {{ product.price }}
              </span>

            </div>

            <div
              class="flex items-center justify-between rounded-2xl bg-slate-100 px-6 py-4"
            >

              <span class="font-semibold text-slate-600">
                Quantity
              </span>

              <span class="text-2xl font-bold text-indigo-600">
                {{ product.quantity }}
              </span>

            </div>

            <div
              class="flex items-center justify-between rounded-2xl bg-slate-100 px-6 py-4"
            >

              <span class="font-semibold text-slate-600">
                Created
              </span>

              <span class="font-bold text-slate-700">
                {{ product.created_at || 'N/A' }}
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>

    <!-- LOADING -->
    <div
      *ngIf="loading"
      class="rounded-3xl bg-white p-10 text-center text-slate-500 shadow-xl"
    >
      Loading product...
    </div>

  </div>

</div>

`
})
export class ProductDetailsComponent implements OnInit {

  product: any = null;

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (id) {

      this.productService
        .getProduct(id)
        .subscribe({

          next: (result: any) => {

            this.product = result;

            this.loading = false;
          },

          error: (error: any) => {

            console.error(
              'PRODUCT DETAILS ERROR:',
              error
            );

            this.loading = false;
          }

        });

    }

  }

}