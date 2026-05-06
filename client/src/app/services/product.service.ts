import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment }
from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl =
    `${environment.apiUrl}/products`;

  constructor(
    private http: HttpClient
  ) {}

  private getAuthHeaders(): HttpHeaders {

    const token =
      localStorage.getItem(
        'inventory_token'
      );

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getProducts(): Observable<any> {

    return this.http.get(
      this.apiUrl
    );
  }

  getProduct(id: number): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/${id}`
    );
  }

  saveProduct(product: any, file?: File): Observable<any> {

    const formData = new FormData();

    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);

    if (file) {
      formData.append('image', file);
    }

    return this.http.post(
      this.apiUrl,
      formData,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  updateProduct(
    id: number,
    product: any,
    file?: File
  ): Observable<any> {

    const formData = new FormData();

    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);

    if (file) {
      formData.append('image', file);
    }

    return this.http.put(
      `${this.apiUrl}/${id}`,
      formData,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  deleteProduct(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

}