import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // LOCAL API
  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  // =========================
  // GET TOKEN
  // =========================
  private getHeaders() {

    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };

  }

  // =========================
  // GET ALL PRODUCTS
  // =========================
  getProducts(): Observable<any> {

    return this.http.get(
      this.apiUrl,
      this.getHeaders()
    );

  }

  // =========================
  // GET SINGLE PRODUCT
  // =========================
  getProduct(id: number): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/${id}`,
      this.getHeaders()
    );

  }

  // =========================
  // CREATE PRODUCT
  // =========================
  createProduct(data: any): Observable<any> {

    return this.http.post(
      this.apiUrl,
      data,
      this.getHeaders()
    );

  }

  // =========================
  // UPDATE PRODUCT
  // =========================
  updateProduct(
    id: number,
    data: any
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      data,
      this.getHeaders()
    );

  }

  // =========================
  // DELETE PRODUCT
  // =========================
  deleteProduct(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      this.getHeaders()
    );

  }

}