import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="space-y-6">
      <button routerLink="/products" class="rounded-2xl bg-slate-100 px-4 py-2 text-slate-700 hover:bg-slate-200">Back to products</button>
      <section *ngIf="product" class="rounded-3xl bg-white p-8 shadow-sm">
        <div class="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <img *ngIf="product.image" [src]="product.image" alt="Product image" class="h-72 w-full rounded-3xl object-cover" />
          <div>
            <h1 class="text-3xl font-semibold">{{ product.name }}</h1>
            <p class="mt-4 text-slate-600">{{ product.description }}</p>
            <div class="mt-6 space-y-3 text-lg text-slate-700">
              <p><strong>Price:</strong> $ {{ product.price }}</p>
              <p><strong>Quantity:</strong> {{ product.quantity }}</p>
              <p><strong>Created:</strong> {{ product.created_at | date:'medium' }}</p>
            </div>
          </div>
        </div>
      </section>
      <div *ngIf="!product" class="rounded-3xl bg-white p-8 shadow-sm text-slate-500">Loading product...</div>
    </div>
  `
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProduct(id).subscribe((result) => {
        this.product = result;
      });
    }
  }
}
