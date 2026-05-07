import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

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

  products: any[] = [];

  filteredProducts: any[] = [];

  searchTerm = '';

  darkMode = false;

  showForm = false;

  isEditing = false;

  isLoading = false;

  selectedFile: File | null = null;

  imagePreview: string | ArrayBuffer | null = null;

  formData: any = {

    id: '',

    name: '',

    description: '',

    category: 'Gadgets',

    price: 0,

    quantity: 0

  };

  categories = [

    'Gadgets',

    'Fashion',

    'Electricity',

    'Home',

    'Sports',

    'Other'

  ];

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {

    this.loadProducts();

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

          this.products =
            response.items || [];

          this.products =
  this.products.map(
    (product: any) => ({

      ...product,

      status:
        product.quantity <= 5
          ? 'Low Stock'
          : 'In Stock'

    })
  );

          this.filteredProducts = [
            ...this.products
          ];

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

  }

  /* =========================================
     OPEN CREATE FORM
  ========================================= */

  openCreateForm(): void {

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
      product.image;

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

  /* =========================================
     SAVE PRODUCT
  ========================================= */
  }
  saveProduct(): void {

    if (
      !this.formData.name ||
      !this.formData.category
    ) {

      alert(
        'Please fill required fields'
      );

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

    /* =========================
       UPDATE
    ========================= */

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

            alert(
              'Product updated successfully'
            );

          },

          error: (err) => {

            console.log(err);

            alert(
              'Failed to update product'
            );

          }

        });

    }

    /* =========================
       CREATE
    ========================= */

    else {

      this.productService
        .createProduct(formData)
        .subscribe({

          next: () => {

            this.loadProducts();

            this.showForm = false;

            this.selectedFile = null;

            this.imagePreview = null;

            alert(
              'Product created successfully'
            );

          },

          error: (err) => {

            console.log(err);

            alert(
              'Failed to create product'
            );

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

          alert(
            'Product deleted successfully'
          );

        },

        error: (err) => {

          console.log(err);

          alert(
            'Failed to delete product'
          );

        }

      });

  }

}