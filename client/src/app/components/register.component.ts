import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="mx-auto max-w-2xl rounded-3xl bg-white p-10 shadow-lg">
      <h1 class="mb-6 text-3xl font-semibold">Create an account</h1>
      <form [formGroup]="registerForm" (ngSubmit)="submit()" class="space-y-4">
        <label class="block">
          <span class="text-sm font-medium text-slate-700">Full Name</span>
          <input formControlName="name" type="text" placeholder="Your name" class="mt-2 w-full" />
        </label>
        <label class="block">
          <span class="text-sm font-medium text-slate-700">Email</span>
          <input formControlName="email" type="email" placeholder="you@example.com" class="mt-2 w-full" />
        </label>
        <label class="block">
          <span class="text-sm font-medium text-slate-700">Password</span>
          <input formControlName="password" type="password" placeholder="Create password" class="mt-2 w-full" />
        </label>
        <button type="submit" [disabled]="loading" class="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-700">
          {{ loading ? 'Registering...' : 'Create Account' }}
        </button>
      </form>
      <p class="mt-4 text-sm text-slate-500">
        Already have an account? <a routerLink="/login" class="font-semibold text-indigo-600 hover:text-indigo-700">Sign in</a>
      </p>
      <p *ngIf="error" class="mt-3 text-sm text-red-600">{{ error }}</p>
      <p *ngIf="success" class="mt-3 text-sm text-green-600">{{ success }}</p>
    </div>
  `
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  loading = false;
  error = '';
  success = '';

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const { name, email, password } = this.registerForm.value;
    this.authService.register(name!, email!, password!).subscribe({
      next: () => {
        this.success = 'Registered successfully. Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 1200);
      },
      error: (err) => {
        this.error = err.error?.message || 'Unable to register';
        this.loading = false;
      }
    });
  }
}
