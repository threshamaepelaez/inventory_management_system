import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule, Router } from '@angular/router';

import { environment } from '../../environments/environment';

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

  dashboardRecentProducts: any[] = [];

  dashboardCurrentPage = 1;

  dashboardItemsPerPage = 5;

  dashboardTotalPages = 1;

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

  /* =========================
     DARK MODE
  ========================= */

  isDarkMode = false;

  constructor(

    private productService: ProductService,

    private router: Router

  ) {}

  /* =========================
     INIT
  ========================= */

  ngOnInit(): void {

    /* =========================
       DARK MODE
    ========================= */

    const savedTheme =
      localStorage.getItem('theme');

    if (savedTheme === 'dark') {

      this.isDarkMode = true;

      document.documentElement.classList.add(
        'dark'
      );

    }

    /* =========================
       LOAD PRODUCTS
    ========================= */

    this.loadProducts();

    /* =========================
       USER ROLE
    ========================= */

    this.userRole =
      localStorage.getItem('role') || '';

    console.log(
      'ROLE:',
      this.userRole
    );

    /* =========================
       USER INFO
    ========================= */

    const user =
      JSON.parse(
        localStorage.getItem('user') || '{}'
      );

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

                imageUrl:
                  product.image
                    ? `${environment.apiUrl}/uploads/${product.image}`
                    : 'assets/no-image.png'

              })
            );

          this.updateDashboardPagination();

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

    localStorage.removeItem(
      'theme'
    );

    this.router.navigate([
      '/login'
    ]);

  }

  /* =========================
     REFRESH
  ========================= */

  refreshDashboard(): void {

    window.location.reload();

  }

  /* =========================
     DARK MODE TOGGLE
  ========================= */

  toggleDarkMode(): void {

    this.isDarkMode =
      !this.isDarkMode;

    if (this.isDarkMode) {

      document.documentElement.classList.add(
        'dark'
      );

      localStorage.setItem(
        'theme',
        'dark'
      );

    } else {

      document.documentElement.classList.remove(
        'dark'
      );

      localStorage.setItem(
        'theme',
        'light'
      );

    }

  }

  /* =========================
     LOW STOCK
  ========================= */

  viewLowStock(): void {

    this.router.navigate(
      ['/products'],
      {
        queryParams: {
          lowStock: 'true'
        }
      }
    );

  }

  /* =========================
     SCROLL TOP
  ========================= */

  scrollToTop(): void {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }

  /* =========================
     PAGINATION
  ========================= */

  updateDashboardPagination(): void {

    this.dashboardTotalPages =
      Math.max(
        1,
        Math.ceil(
          this.products.length /
          this.dashboardItemsPerPage
        )
      );

    if (
      this.dashboardCurrentPage >
      this.dashboardTotalPages
    ) {

      this.dashboardCurrentPage =
        this.dashboardTotalPages;

    }

    if (
      this.dashboardCurrentPage < 1
    ) {

      this.dashboardCurrentPage = 1;

    }

    const startIndex =

      (
        this.dashboardCurrentPage - 1
      ) *

      this.dashboardItemsPerPage;

    const endIndex =

      startIndex +

      this.dashboardItemsPerPage;

    this.dashboardRecentProducts =

      this.products.slice(
        startIndex,
        endIndex
      );

  }

  dashboardNextPage(): void {

    if (

      this.dashboardCurrentPage <

      this.dashboardTotalPages

    ) {

      this.dashboardCurrentPage++;

      this.updateDashboardPagination();

    }

  }

  dashboardPreviousPage(): void {

    if (

      this.dashboardCurrentPage > 1

    ) {

      this.dashboardCurrentPage--;

      this.updateDashboardPagination();

    }

  }

}