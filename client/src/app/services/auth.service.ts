import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {
  BehaviorSubject,
  Observable,
  map
} from 'rxjs';

import { environment }
from '../../environments/environment';

import {
  AuthResponse,
  User
} from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject =
    new BehaviorSubject<User | null>(
      this.getStoredUser()
    );

  currentUser$ =
    this.currentUserSubject.asObservable();

  private apiUrl =
    environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  private getStoredUser(): User | null {

    const user =
      localStorage.getItem(
        'inventory_user'
      );

    return user
      ? JSON.parse(user)
      : null;
  }

  get token(): string | null {

    return localStorage.getItem(
      'inventory_token'
    );
  }

  /* =========================
     LOGIN
  ========================= */

  login(
    email: string,
    password: string
  ): Observable<User> {

    return this.http.post<AuthResponse>(

      `${this.apiUrl}/auth/login`,

      {
        email,
        password
      }

    ).pipe(

      map((response: AuthResponse) => {

        localStorage.setItem(
          'inventory_token',
          response.token
        );

        localStorage.setItem(
          'inventory_user',
          JSON.stringify(response.user)
        );

        this.currentUserSubject.next(
          response.user
        );

        return response.user;

      })

    );
  }

  /* =========================
     REGISTER
  ========================= */

  register(
    name: string,
    email: string,
    password: string
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/auth/register`,

      {
        name,
        email,
        password
      }

    );
  }

  /* =========================
     LOGOUT
  ========================= */

  logout(): void {

    localStorage.removeItem(
      'inventory_token'
    );

    localStorage.removeItem(
      'inventory_user'
    );

    this.currentUserSubject.next(
      null
    );
  }

  /* =========================
     AUTH CHECK
  ========================= */

  isAuthenticated(): boolean {

    return !!this.token;
  }

  /* =========================
     ADMIN CHECK
  ========================= */

  isAdmin(): boolean {

    const user =
      this.currentUserSubject.value;

    return user?.role === 'admin';
  }

}