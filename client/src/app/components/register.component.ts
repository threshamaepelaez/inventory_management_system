import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  template: `

<div class="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 p-6">

  <div class="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-800 p-10 shadow-2xl">

    <!-- TITLE -->
    <h1 class="text-5xl font-black text-slate-800 dark:text-white">
      Create Account
    </h1>

    <p class="mt-2 text-slate-400 dark:text-slate-400">
      Register to continue
    </p>

    <!-- FULL NAME -->
    <div class="mt-8">
      <label class="block mb-2 text-sm font-bold text-slate-700 dark:text-white">
        Full Name
      </label>

      <input
        type="text"
        [(ngModel)]="name"
        name="name"
        placeholder="Enter your full name"
        class="w-full rounded-2xl bg-slate-100 dark:bg-slate-700 dark:text-white px-5 py-4 outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>

    <!-- EMAIL -->
    <div class="mt-4">
      <label class="block mb-2 text-sm font-bold text-slate-700 dark:text-white">
        Email
      </label>

      <input
        type="email"
        [(ngModel)]="email"
        name="email"
        placeholder="Enter your email"
        class="w-full rounded-2xl bg-slate-100 dark:bg-slate-700 dark:text-white px-5 py-4 outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>

    <!-- PASSWORD -->
    <div class="mt-4 relative">

      <label class="block mb-2 text-sm font-bold text-slate-700 dark:text-white">
        Password
      </label>

      <input
        [type]="showPassword ? 'text' : 'password'"
        [(ngModel)]="password"
        name="password"
        placeholder="Enter your password"
        class="w-full rounded-2xl bg-slate-100 dark:bg-slate-700 dark:text-white px-5 py-4 pr-14 outline-none focus:ring-2 focus:ring-violet-500"
      />

      <button
        type="button"
        (click)="togglePassword()"
        class="absolute right-4 top-12 text-xl"
      >
        {{ showPassword ? '🙈' : '👁️' }}
      </button>

    </div>

    <!-- ROLE -->
    <div class="mt-4">

      <label class="block mb-2 text-sm font-bold text-slate-700 dark:text-white">
        Select Role
      </label>

      <select
        [(ngModel)]="role"
        name="role"
        class="w-full rounded-2xl bg-slate-100 dark:bg-slate-700 dark:text-white px-5 py-4 outline-none focus:ring-2 focus:ring-violet-500"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

    </div>

    <!-- BUTTON -->
    <button
      (click)="register()"
      [disabled]="loading"
      class="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 text-xl font-bold text-white shadow-lg transition hover:scale-105 disabled:opacity-60"
    >

      <span *ngIf="!loading">
        Register
      </span>

      <span *ngIf="loading">
        Loading...
      </span>

    </button>

    <!-- ERROR -->
    <div
      *ngIf="error"
      class="mt-4 rounded-xl bg-red-100 py-3 text-center text-red-600 font-semibold"
    >
      {{ error }}
    </div>

    <!-- FOOTER -->
    <p class="mt-6 text-center text-slate-500 dark:text-slate-400">

      Already have an account?

      <a
        routerLink="/login"
        class="font-bold text-violet-600 hover:underline ml-1"
      >
        Login
      </a>

    </p>

  </div>

</div>

`
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  role = 'user';

  showPassword = false;

  loading = false;

  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  register() {

    this.error = '';

    if (!this.name || !this.email || !this.password) {

      this.error = 'Please fill in all fields';

      return;
    }

    this.loading = true;

    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.authService.register(data).subscribe({

      next: () => {

        this.loading = false;

        alert('Registered successfully');

        this.router.navigate(['/login']);

      },

      error: (err) => {

        this.loading = false;

        console.log(err);

        this.error =
          err?.error?.message ||
          'Registration failed';

      }

    });

  }

}