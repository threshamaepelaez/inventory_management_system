import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';

import { environment } from '../../environments/environment';

import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin-products',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],

  templateUrl: './admin-products.component.html',

  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent
implements OnInit {

  /* =========================================
     PRODUCTS
  ========================================= */

  products: any[] = [];

  filteredProducts: any[] = [];

  paginatedProducts: any[] = [];

  /* =========================================
     PAGINATION
  ========================================= */

  currentPage = 1;

  itemsPerPage = 5;

  totalPages = 1;

  /* =========================================
     SEARCH
  ========================================= */

  searchTerm = '';

  userRole = '';

isAdmin = false;
  /* =========================================
     UI STATES
  ========================================= */

  darkMode = false;

  showForm = false;

  isEditing = false;

  isLoading = false;

  /* =========================================
     IMAGE
  ========================================= */

  selectedFile: File | null = null;

  imagePreview: string | ArrayBuffer | null = null;

  /* =========================================
     FORM DATA
  ========================================= */

  formData: any = {

    id: '',

    name: '',

    description: '',

    category: 'Gadgets',

    price: 0,

    quantity: 0

  };

  /* =========================================
     CATEGORIES
  ========================================= */

  categories = [

    'Gadgets',

    'Fashion',

    'Electricity',

    'Home',

    'Sports',

    'Other'

  ];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  /* =========================================
     INIT
  ========================================= */

  ngOnInit(): void {

  this.loadProducts();

  const user =
    JSON.parse(
      localStorage.getItem('user') || '{}'
    );

  this.userRole =
    user.role || 'user';

  this.isAdmin =
    this.userRole === 'admin';

}
  /* =========================================
     DARK MODE
  ========================================= */

  toggleDarkMode(): void {

    this.darkMode = !this.darkMode;

    if (this.darkMode) {

      document.documentElement.classList.add('dark');

    } else {

      document.documentElement.classList.remove('dark');

    }

  }

  /* =========================================
     LOAD PRODUCTS
  ========================================= */

  loadProducts(): void {

    this.isLoading = true;

    this.productService
      .getProducts()
      .subscribe({

        next: (response: any) => {

          const items = Array.isArray(response)
            ? response
            : response.items || response.data || [];

          this.products = items.map(
            (product: any) => ({

              ...product,

              category:
                product.category || 'Other',

              imageUrl:
                product.image
                  ? `${environment.apiUrl}/uploads/${product.image}`
                  : 'assets/no-image.png',

              status:
                product.quantity <= 5
                  ? 'Low Stock'
                  : 'In Stock'

            })
          );

          this.filteredProducts = [
            ...this.products
          ];

          /* =========================================
             PAGINATION
          ========================================= */

          this.updatePagination();

          this.isLoading = false;

        },

        error: (err) => {

          console.log(err);

          this.isLoading = false;

        }

      });

  }

  /* =========================================
     SEARCH PRODUCTS
  ========================================= */

  searchProducts(): void {

    const search =
      this.searchTerm.toLowerCase();

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

    this.currentPage = 1;

    this.updatePagination();

  }

  /* =========================================
     PAGINATION
  ========================================= */

  updatePagination(): void {

    this.totalPages =
      Math.ceil(
        this.filteredProducts.length /
        this.itemsPerPage
      );

    const startIndex =
      (this.currentPage - 1) *
      this.itemsPerPage;

    const endIndex =
      startIndex +
      this.itemsPerPage;

    this.paginatedProducts =
      this.filteredProducts.slice(
        startIndex,
        endIndex
      );

  }

  /* =========================================
     NEXT PAGE
  ========================================= */

  nextPage(): void {

    if (
      this.currentPage <
      this.totalPages
    ) {

      this.currentPage++;

      this.updatePagination();

    }

  }

  /* =========================================
     PREVIOUS PAGE
  ========================================= */

  previousPage(): void {

    if (
      this.currentPage > 1
    ) {

      this.currentPage--;

      this.updatePagination();

    }

  }

  /* =========================================
     OPEN CREATE FORM
  ========================================= */

  openCreateForm(): void {

  if (this.showForm) return;

  this.showForm = true;

  this.isEditing = false;

  this.selectedFile = null;

  this.imagePreview = null;

  this.formData = {

    id: '',

    name: '',

    description: '',

    category: 'Gadgets',

    price: 0,

    quantity: 0

  };

}
  /* =========================================
     EDIT PRODUCT
  ========================================= */

  editProduct(product: any): void {

    this.showForm = true;

    this.isEditing = true;

    this.selectedFile = null;

    this.imagePreview =
      product.imageUrl || product.image;

    this.formData = {

      id: product.id,

      name: product.name,

      description: product.description,

      category: product.category,

      price: product.price,

      quantity: product.quantity

    };

  }

  /* =========================================
     CANCEL FORM
  ========================================= */

  cancelForm(): void {

    this.showForm = false;

    this.selectedFile = null;

    this.imagePreview = null;

  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* =========================================
     FILE SELECT
  ========================================= */

  onFileSelected(event: any): void {

    if (
      event.target.files &&
      event.target.files.length > 0
    ) {

      this.selectedFile =
        event.target.files[0];

      const reader =
        new FileReader();

      reader.onload = () => {

        this.imagePreview =
          reader.result;

      };

      if (this.selectedFile !== null) {

        reader.readAsDataURL(
          this.selectedFile
        );

      }

    }

  }

  /* =========================================
     SAVE PRODUCT
  ========================================= */

  saveProduct(): void {

    if (
      !this.formData.name ||
      !this.formData.category
    ) {

      

      return;

    }

    const formData =
      new FormData();

    formData.append(
      'name',
      this.formData.name
    );

    formData.append(
      'description',
      this.formData.description || ''
    );

    formData.append(
      'category',
      this.formData.category
    );

    formData.append(
      'price',
      this.formData.price.toString()
    );

    formData.append(
      'quantity',
      this.formData.quantity.toString()
    );

    if (this.selectedFile !== null) {

      formData.append(
        'image',
        this.selectedFile as Blob
      );

    }

    /* =========================================
       UPDATE
    ========================================= */

    if (this.isEditing) {

      this.productService
        .updateProduct(
          this.formData.id,
          formData
        )
        .subscribe({

          next: () => {

            this.loadProducts();

            this.showForm = false;

            this.selectedFile = null;

            this.imagePreview = null;

            

          },

          error: (err) => {

            console.log(err);

            

          }

        });

    }

    /* =========================================
       CREATE
    ========================================= */

    else {

      this.productService
        .createProduct(formData)
        .subscribe({

          next: () => {

            this.loadProducts();

            this.showForm = false;

            this.selectedFile = null;

            this.imagePreview = null;

            

          },

          error: (err) => {

            console.log(err);

            

          }

        });

    }

  }

  /* =========================================
     DELETE PRODUCT
  ========================================= */

  deleteProduct(id: number): void {

    const confirmDelete =
      confirm(
        'Delete this product?'
      );

    if (!confirmDelete) return;

    this.productService
      .deleteProduct(id)
      .subscribe({

        next: () => {

          this.loadProducts();

          

        },

        error: (err) => {

          console.log(err);

         
        }

      });

  }

}