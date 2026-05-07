import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],

  templateUrl: './products.component.html',

  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  products: any[] = [];

  filteredProducts: any[] = [];

  searchTerm = '';

  loading = false;

  error = '';

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {

    this.loadProducts();

  }

  loadProducts(): void {

    this.loading = true;

    this.error = '';

    this.productService
      .getProducts()
      .subscribe({

        next: (response: any) => {

          console.log(
            'PRODUCT RESPONSE:',
            response
          );

          if (
            Array.isArray(response)
          ) {

            this.products = response;

          }

          else if (
            response?.products
          ) {

            this.products =
              response.products;

          }

          else {

            this.products = [];

          }

          this.filteredProducts = [
            ...this.products
          ];

          this.loading = false;

        },

        error: (err) => {

          console.error(err);

          this.loading = false;

          this.error =
            'Failed to load products';

        }

      });

  }

  searchProducts(): void {

    const search =
      this.searchTerm
        .toLowerCase()
        .trim();

    if (!search) {

      this.filteredProducts = [
        ...this.products
      ];

      return;

    }

    this.filteredProducts =
      this.products.filter(
        (product: any) =>

          product.name
            ?.toLowerCase()
            .includes(search)

          ||

          product.category
            ?.toLowerCase()
            .includes(search)

      );

  }

}