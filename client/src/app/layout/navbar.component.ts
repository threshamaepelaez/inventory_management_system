import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `

<div
  class="bg-white/90 backdrop-blur-xl border-b border-slate-200 px-10 py-6 flex justify-between items-center shadow-sm"
>

  <!-- LEFT -->
  <div>

    <h1
      class="text-5xl font-black bg-gradient-to-r from-indigo-600 via-violet-500 to-cyan-500 bg-clip-text text-transparent"
    >
      Inventory Dashboard
    </h1>

    <p class="text-slate-400 mt-2 text-lg">
      Welcome back, {{ username }} 👋
    </p>

  </div>

  <!-- RIGHT -->
  <div class="flex items-center gap-4">

    <div
      class="hidden md:flex items-center gap-3 rounded-2xl bg-slate-100 px-5 py-3 shadow-inner"
    >

      <div
        class="w-3 h-3 rounded-full bg-green-500 animate-pulse"
      ></div>

      <span class="font-semibold text-slate-600">
        System Online
      </span>

    </div>

    <div
      class="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 shadow-xl hover:scale-110 transition duration-300"
    ></div>

  </div>

</div>

`
})
export class NavbarComponent {

  username = 'User';

  constructor(private authService: AuthService) {

    const user = this.authService.getStoredUser();

    if (user?.name) {

      this.username = user.name;

    }

  }

}