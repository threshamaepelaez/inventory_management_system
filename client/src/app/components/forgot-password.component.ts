import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 p-6">
      <div class="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-800 p-10 shadow-2xl">
        <h1 class="text-4xl font-black text-slate-800 dark:text-white">Forgot Password</h1>
        <p class="mt-2 text-slate-500 dark:text-slate-400">Enter your email to reset your password</p>
        <form (ngSubmit)="submit()" class="mt-8 space-y-6">
          <div>
            <label class="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-200">Email</label>
            <input type="email" [(ngModel)]="email" name="email" required class="w-full rounded-xl bg-slate-100 dark:bg-slate-700 px-5 py-4 outline-none text-slate-900 dark:text-white" />
          </div>
          <button type="submit" [disabled]="loading" class="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-4 text-xl font-bold text-white shadow-lg transition hover:scale-105 disabled:opacity-60">
            <span *ngIf="!loading">Send Reset Link</span>
            <span *ngIf="loading">Sending...</span>
          </button>
          <div *ngIf="message" class="mt-4 text-green-500 text-center font-semibold">{{ message }}</div>
          <div *ngIf="error" class="mt-4 text-red-500 text-center font-semibold">{{ error }}</div>
        </form>
        <div class="mt-8 text-center">
          <a routerLink="/login" class="text-indigo-600 font-bold hover:underline">Back to Login</a>
        </div>
      </div>
    </div>
  `
})
export class ForgotPasswordComponent {
  email = '';
  loading = false;
  message = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    this.loading = true;
    this.message = '';
    this.error = '';
    // Simulate API call
    setTimeout(() => {
      this.loading = false;
      this.message = 'If this email exists, a reset link has been sent.';
    }, 1500);
  }
}
