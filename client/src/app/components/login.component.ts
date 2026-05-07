import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],

  template: `

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 p-6">

  <div class="grid w-full max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-2xl lg:grid-cols-2">

    <!-- LEFT SIDE -->
    <div class="hidden lg:flex flex-col items-center justify-center bg-slate-900 p-16 text-white">

      <!-- LOGO -->
      <div
        class="flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 text-5xl shadow-2xl shadow-blue-500/30"
      >
        📦
      </div>

      <h1 class="mt-8 text-5xl font-black">
        Inventory MS
      </h1>

      <p class="mt-6 max-w-md text-center text-lg leading-relaxed text-slate-300">

        Track products, monitor inventory,
        manage stock levels, and streamline
        your business operations efficiently.

      </p>

     

    </div>

    <!-- RIGHT SIDE -->
    <div class="flex items-center justify-center p-10">

      <div class="w-full max-w-md">

        <!-- MOBILE LOGO -->
        <div class="mb-8 flex justify-center lg:hidden">

          <div
            class="flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 text-4xl text-white shadow-xl"
          >
            📦
          </div>

        </div>

        <!-- TITLE -->
        <h2 class="text-4xl font-black text-slate-900">
          Welcome Back
        </h2>

        <p class="mt-2 text-slate-500">
          Sign in to continue to your dashboard
        </p>

        <!-- EMAIL -->
        <div class="mt-8">

          <label
            class="mb-2 block font-semibold text-slate-700"
          >
            Email
          </label>

          <input
            type="email"
            [(ngModel)]="email"
            placeholder="Enter your email"
            class="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 outline-none transition focus:border-indigo-600 focus:bg-white"
          />

        </div>

        <!-- PASSWORD -->
        <div class="mt-5">

          <div class="mb-2 flex items-center justify-between">

            <label
              class="font-semibold text-slate-700"
            >
              Password
            </label>

            <!-- FORGOT PASSWORD -->
            <a
              routerLink="/forgot-password"
              class="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
            >
              Forgot Password?
            </a>

          </div>

          <!-- PASSWORD WRAPPER -->
          <div class="relative">

            <input
              [type]="showPassword ? 'text' : 'password'"
              [(ngModel)]="password"
              placeholder="Enter your password"
              class="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 pr-16 outline-none transition focus:border-indigo-600 focus:bg-white"
            />

            <!-- SHOW PASSWORD -->
            <button
              type="button"
              (click)="togglePassword()"
              class="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-slate-500 transition hover:text-slate-800"
            >

              {{ showPassword ? '🙈' : '👁️' }}

            </button>

          </div>

        </div>

        <!-- LOGIN BUTTON -->
        <button

          (click)="login()"

          [disabled]="isLoading"

          class="mt-8 w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 py-4 text-lg font-black text-white shadow-xl transition hover:scale-[1.02] hover:from-indigo-600 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-70"

        >

          {{ isLoading ? 'Signing In...' : 'Login' }}

        </button>

        <!-- SIGN UP -->
        <div class="mt-6 text-center text-slate-500">

          Don't have an account?

          <a
            routerLink="/register"
            class="font-bold text-indigo-600 transition hover:text-indigo-800"
          >
            Sign Up
          </a>

        </div>

        <!-- ERROR -->
        <div
          *ngIf="errorMessage"
          class="mt-5 rounded-2xl border border-red-200 bg-red-100 p-4 text-center font-semibold text-red-700"
        >

          {{ errorMessage }}

        </div>

      </div>

    </div>

  </div>

</div>

`
})

export class LoginComponent {

  email = '';

  password = '';

  errorMessage = '';

  showPassword = false;

  isLoading = false;

  constructor(

    private authService: AuthService,

    private router: Router

  ) {}

  /* =========================
     TOGGLE PASSWORD
  ========================= */

  togglePassword(): void {

    this.showPassword =
      !this.showPassword;

  }

  /* =========================
     LOGIN
  ========================= */

  login(): void {

    this.errorMessage = '';

    this.isLoading = true;

    const data = {

      email: this.email,

      password: this.password

    };

    this.authService
      .login(data)
      .subscribe({

        next: (response: any) => {

          console.log(
            'LOGIN RESPONSE:',
            response
          );

          /* =========================
             SAVE TOKEN
          ========================= */

          localStorage.setItem(

            'token',

            response.token

          );

          /* =========================
             SAVE USER
          ========================= */

          localStorage.setItem(

            'user',

            JSON.stringify(
              response.user
            )

          );

          /* =========================
             REDIRECT
          ========================= */

          this.router.navigate([
            '/dashboard'
          ]);

          this.isLoading = false;

        },

        error: (error: any) => {

          console.log(
            'LOGIN ERROR:',
            error
          );

          this.errorMessage =
            'Invalid email or password';

          this.isLoading = false;

        }

      });

  }

}