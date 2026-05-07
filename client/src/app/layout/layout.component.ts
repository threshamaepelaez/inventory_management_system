import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Router,
  RouterModule
} from '@angular/router';

@Component({
  selector: 'app-layout',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule
  ],

  template: `

<div class="min-h-screen bg-slate-100">

  <div class="flex">

    <!-- SIDEBAR -->
    <aside
      class="fixed left-0 top-0 flex h-screen w-[290px] flex-col justify-between border-r bg-white p-6 shadow-sm"
    >

      <!-- TOP -->
      <div>

        <!-- LOGO -->
        <div
          class="flex items-center gap-4"
        >

          <div
            class="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 text-2xl font-black text-white shadow-lg"
          >
            I
          </div>

          <div>

            <h1
              class="text-4xl font-black text-slate-900"
            >
              Inventory MS
            </h1>

            <p
              class="text-slate-400"
            >
              Smart Management System
            </p>

          </div>

        </div>

        <!-- NAVIGATION -->
        <nav
          class="mt-14 space-y-4"
        >

          <!-- DASHBOARD -->
          <a
            routerLink="/dashboard"
            routerLinkActive="bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl"
            class="flex items-center gap-3 rounded-2xl px-6 py-5 text-2xl font-bold text-slate-800 transition duration-300 hover:bg-slate-100"
          >
            📊 Dashboard
          </a>

          <!-- PRODUCTS -->
          <a
            routerLink="/products"
            routerLinkActive="bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl"
            class="flex items-center gap-3 rounded-2xl px-6 py-5 text-2xl font-bold text-slate-800 transition duration-300 hover:bg-slate-100"
          >
            📦 Products
          </a>

          <!-- ADMIN -->
          <a
            routerLink="/admin"
            routerLinkActive="bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl"
            class="flex items-center gap-3 rounded-2xl px-6 py-5 text-2xl font-bold text-slate-800 transition duration-300 hover:bg-slate-100"
          >
            ⚙️ Admin
          </a>

        </nav>

      </div>

      <!-- USER CARD -->
      <div
        class="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-5 text-white shadow-xl"
      >

        <div
          class="flex items-center gap-4"
        >

          <!-- AVATAR -->
          <div
            class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-2xl font-black"
          >
            {{ username.charAt(0) }}
          </div>

          <!-- USER INFO -->
          <div>

            <h2
              class="text-xl font-black"
            >
              {{ username }}
            </h2>

            <p
              class="text-sm text-white/70"
            >
              {{ email }}
            </p>

          </div>

        </div>

        <!-- LOGOUT -->
        <button
          (click)="logout()"
          class="mt-5 w-full rounded-2xl bg-red-500 py-4 text-lg font-black text-white transition duration-300 hover:bg-red-600 hover:scale-[1.02]"
        >
          Logout
        </button>

      </div>

    </aside>

    <!-- MAIN CONTENT -->
    <main
      class="ml-[290px] min-h-screen flex-1"
    >

      <!-- TOP BAR -->
      <header
        class="flex items-center justify-between border-b bg-white px-12 py-8"
      >

        <div>

          <h1
            class="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-6xl font-black text-transparent"
          >
            Inventory Dashboard
          </h1>

          <p
            class="mt-2 text-2xl text-slate-400"
          >
            Welcome back, {{ username }} 👋
          </p>

        </div>

        <!-- STATUS -->
        <div
          class="flex items-center gap-4"
        >

          <div
            class="rounded-2xl bg-slate-100 px-6 py-4 text-xl font-bold text-slate-600"
          >
            🟢 System Online
          </div>

          <div
            class="h-16 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 shadow-xl"
          ></div>

        </div>

      </header>

      <!-- ROUTER -->
      <div
        class="p-8"
      >

        <router-outlet></router-outlet>

      </div>

    </main>

  </div>

</div>

`
})
export class LayoutComponent implements OnInit {

  username = 'User';

  email = '';

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    const user = JSON.parse(
      localStorage.getItem('user') || '{}'
    );

    this.username =
      user.name || 'User';

    this.email =
      user.email || '';

  }

  logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

    this.router.navigate(['/login']);

  }

}