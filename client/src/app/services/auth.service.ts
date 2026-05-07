import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  Observable,
  tap
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl =
    'https://inventory-management-system1-ptf7.onrender.com/api/auth';

  constructor(
    private http: HttpClient
  ) {}

  // =========================
  // LOGIN
  // =========================
  login(data: any): Observable<any> {

    return this.http
      .post(
        `${this.apiUrl}/login`,
        data
      )
      .pipe(

        tap((response: any) => {

          console.log(
            'LOGIN RESPONSE:',
            response
          );

          // SAVE TOKEN
          if (response?.token) {

            localStorage.setItem(
              'token',
              response.token
            );

          }

          // SAVE USER
          if (response?.user) {

            localStorage.setItem(
              'user',
              JSON.stringify(response.user)
            );

          }

        })

      );

  }

  // =========================
  // REGISTER
  // =========================
  register(data: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/register`,
      data
    );

  }

  // =========================
  // LOGOUT
  // =========================
  logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

  }

  // =========================
  // TOKEN
  // =========================
  getToken(): string | null {

    return localStorage.getItem('token');

  }

  // =========================
  // USER
  // =========================
  getStoredUser(): any {

    const user =
      localStorage.getItem('user');

    if (!user) {

      return null;

    }

    try {

      return JSON.parse(user);

    } catch {

      return null;

    }

  }

  // =========================
  // AUTH CHECK
  // =========================
  isAuthenticated(): boolean {

    return !!localStorage.getItem(
      'token'
    );

  }

  // =========================
  // ALIAS
  // FIX auth.guard.ts
  // =========================
  isLoggedIn(): boolean {

    return this.isAuthenticated();

  }

  // =========================
  // HEADERS
  // =========================
  getAuthHeaders(): HttpHeaders {

    const token = this.getToken();

    return new HttpHeaders({

      Authorization:
        `Bearer ${token}`

    });

  }

}