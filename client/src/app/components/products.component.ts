import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {

    this.loading = true;
    this.error = null;

    this.productService.getProducts().subscribe({

      next: (response: any) => {

        const rawProducts = Array.isArray(response)
          ? response
          : response.items || response.products || response.data || response || [];

        this.products = rawProducts.map((item: any) => this.normalizeProduct(item));

        this.loading = false;
      },

      error: (error) => {

        console.error(
          'Error loading products:',
          error
        );

        this.error =
          error?.error?.message ||
          error?.message ||
          'Unable to load products';

        this.loading = false;
      }
    });
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
}