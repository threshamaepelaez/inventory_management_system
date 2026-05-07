import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  /* =========================
     API URL
  ========================= */

  private apiUrl =
    'https://inventory-management-system1-ptf7.onrender.com/api/products';

  private imageBaseUrl =
    'https://inventory-management-system1-ptf7.onrender.com/uploads/';

  constructor(
    private http: HttpClient
  ) {}

  /* =========================
     TOKEN HEADER
  ========================= */

  private getHeaders(): HttpHeaders {

    const token =
      localStorage.getItem('token');

    return new HttpHeaders({

      Authorization:
        `Bearer ${token}`

    });

  }

  /* =========================
     GET IMAGE URL
  ========================= */

  getImageUrl(
    image: string
  ): string {

    if (!image) {

      return 'assets/no-image.png';

    }

    /* ALREADY FULL URL */

    if (
      image.startsWith('http')
    ) {

      return image;

    }

    return `${this.imageBaseUrl}${image}`;

  }

  /* =========================
     GET PRODUCTS
  ========================= */

  getProducts(): Observable<any> {

    return this.http.get<any>(
      this.apiUrl
    );

  }

  /* =========================
     GET SINGLE PRODUCT
  ========================= */

  getProduct(
    id: number
  ): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );

  }

  /* =========================
     CREATE PRODUCT
  ========================= */

  createProduct(
    data: FormData
  ): Observable<any> {

    return this.http.post<any>(

      this.apiUrl,

      data,

      {
        headers:
          this.getHeaders()
      }

    );

  }

  /* =========================
     UPDATE PRODUCT
  ========================= */

  updateProduct(
    id: number,
    data: FormData
  ): Observable<any> {

    return this.http.put<any>(

      `${this.apiUrl}/${id}`,

      data,

      {
        headers:
          this.getHeaders()
      }

    );

  }

  /* =========================
     DELETE PRODUCT
  ========================= */

  deleteProduct(
    id: number
  ): Observable<any> {

    return this.http.delete<any>(

      `${this.apiUrl}/${id}`,

      {
        headers:
          this.getHeaders()
      }

    );

  }

}