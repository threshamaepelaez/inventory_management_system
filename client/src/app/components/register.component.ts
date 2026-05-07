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

<div class="min-h-screen flex items-center justify-center bg-slate-100">

  <div class="w-full max-w-lg rounded-3xl bg-white p-10 shadow-2xl">

    <h1 class="text-5xl font-black text-slate-800">
      Create Account
    </h1>

    <p class="mt-2 text-slate-400">
      Register to continue
    </p>

    <input
      type="text"
      [(ngModel)]="name"
      placeholder="Full Name"
      class="mt-8 w-full rounded-2xl bg-slate-100 px-5 py-4 outline-none"
    />

    <input
      type="email"
      [(ngModel)]="email"
      placeholder="Email"
      class="mt-4 w-full rounded-2xl bg-slate-100 px-5 py-4 outline-none"
    />

    <input
      type="password"
      [(ngModel)]="password"
      placeholder="Password"
      class="mt-4 w-full rounded-2xl bg-slate-100 px-5 py-4 outline-none"
    />

    <button
      (click)="register()"
      class="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 text-xl font-bold text-white"
    >
      Register
    </button>

    <p class="mt-6 text-center text-slate-500">

      Already have an account?

      <a
        routerLink="/login"
        class="font-bold text-violet-600"
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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {

    const data = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.register(data).subscribe({

      next: () => {

        alert('Registered successfully');

        this.router.navigate(['/login']);

      },

      error: (err) => {

        console.log(err);

        alert('Registration failed');

      }

    });

  }

}