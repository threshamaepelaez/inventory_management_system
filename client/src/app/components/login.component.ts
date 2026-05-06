import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="mx-auto max-w-2xl rounded-3xl bg-white p-10 shadow-lg">
      <h1 class="mb-6 text-3xl font-semibold">Login to Inventory</h1>
      <form [formGroup]="loginForm" (ngSubmit)="submit()" class="space-y-4">
        <label class="block">
          <span class="text-sm font-medium text-slate-700">Email</span>
          <input formControlName="email" type="email" placeholder="you@example.com" class="mt-2 w-full" />
        </label>
        <label class="block">
          <span class="text-sm font-medium text-slate-700">Password</span>
          <input formControlName="password" type="password" placeholder="Enter password" class="mt-2 w-full" />
        </label>
        <button type="submit" [disabled]="loading" class="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-700">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>
      <p class="mt-4 text-sm text-slate-500">
        New here? <a routerLink="/register" class="font-semibold text-indigo-600 hover:text-indigo-700">Create an account</a>
      </p>
      <p *ngIf="error" class="mt-3 text-sm text-red-600">{{ error }}</p>
    </div>
  `
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const { email, password } = this.loginForm.value;
    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Unable to login';
        this.loading = false;
      }
    });
  }
}
