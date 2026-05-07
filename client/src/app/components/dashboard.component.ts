import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule, Router } from '@angular/router';

import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule
  ],

  templateUrl: './dashboard.component.html',

  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent
implements OnInit {

  /* =========================
     PRODUCTS
  ========================= */

  products: any[] = [];

  /* =========================
     DASHBOARD STATS
  ========================= */

  lowStockCount = 0;

  outOfStockCount = 0;

  totalValue = 0;

  categoryCount = 0;

  /* =========================
     USER
  ========================= */

  userRole = '';

  userName = '';

  /* =========================
     LOADING
  ========================= */

  isLoading = false;

  constructor(

    private productService: ProductService,

    private router: Router

  ) {}

  /* =========================
     INIT
  ========================= */

  ngOnInit(): void {

    this.loadProducts();

    const user =
      JSON.parse(
        localStorage.getItem('user') || '{}'
      );

    this.userRole =
      user.role || 'user';

    this.userName =
      user.name || 'User';

  }

  /* =========================
     LOAD PRODUCTS
  ========================= */

  loadProducts(): void {

    this.isLoading = true;

    this.productService
      .getProducts()
      .subscribe({

        next: (response: any) => {

          /* =========================
             RESPONSE
          ========================= */

          if (Array.isArray(response)) {

            this.products = response;

          } else {

            this.products =
              response.items || [];

          }

          /* =========================
             IMAGE FALLBACK
          ========================= */

          this.products =
            this.products.map(
              (product: any) => ({

                ...product,

                image:
                  product.image ||
                  'assets/no-image.png'

              })
            );

          /* =========================
             LOW STOCK
          ========================= */

          this.lowStockCount =
            this.products.filter(

              (p: any) =>

                p.quantity <= 10 &&
                p.quantity > 0

            ).length;

          /* =========================
             OUT OF STOCK
          ========================= */

          this.outOfStockCount =
            this.products.filter(

              (p: any) =>

                p.quantity <= 0

            ).length;

          /* =========================
             TOTAL VALUE
          ========================= */

          this.totalValue =
            this.products.reduce(

              (
                total: number,
                p: any
              ) =>

                total +

                (
                  Number(p.price) *
                  Number(p.quantity)
                ),

              0

            );

          /* =========================
             CATEGORY COUNT
          ========================= */

          const uniqueCategories =
            new Set(

              this.products.map(
                (p: any) =>
                  p.category
              )

            );

          this.categoryCount =
            uniqueCategories.size;

          this.isLoading = false;

        },

        error: (error: any) => {

          console.error(
            'Dashboard Error:',
            error
          );

          this.isLoading = false;

        }

      });

  }

  /* =========================
     LOGOUT
  ========================= */

  logout(): void {

    localStorage.removeItem(
      'token'
    );

    localStorage.removeItem(
      'user'
    );

    this.router.navigate([
      '/login'
    ]);

  }

}