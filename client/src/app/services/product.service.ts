import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product, ProductListResponse } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('inventory_token');
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${token || ''}` })
    };
  }

  getProducts(search = '', page = 1, limit = 10, available = ''): Observable<ProductListResponse> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    if (search) params = params.set('search', search);
    if (available) params = params.set('available', available);
    return this.http.get<ProductListResponse>(`${environment.apiUrl}/products`, {
      ...this.getAuthHeaders(),
      params
    });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`, this.getAuthHeaders());
  }

  saveProduct(product: Partial<Product>, file?: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', product.name || '');
    formData.append('description', product.description || '');
    formData.append('price', `${product.price || 0}`);
    formData.append('quantity', `${product.quantity || 0}`);
    if (file) {
      formData.append('image', file);
    }
    return this.http.post(`${environment.apiUrl}/products`, formData, this.getAuthHeaders());
  }

  updateProduct(id: number, product: Partial<Product>, file?: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', product.name || '');
    formData.append('description', product.description || '');
    formData.append('price', `${product.price || 0}`);
    formData.append('quantity', `${product.quantity || 0}`);
    if (file) {
      formData.append('image', file);
    }
    return this.http.put(`${environment.apiUrl}/products/${id}`, formData, this.getAuthHeaders());
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/products/${id}`, this.getAuthHeaders());
  }
}
