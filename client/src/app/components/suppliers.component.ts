import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suppliers',

  standalone: true,

  imports: [
    CommonModule
  ],

  template: `

<div class="p-10">

  <h1 class="text-5xl font-black text-slate-800">
    Suppliers
  </h1>

  <p class="mt-4 text-slate-500 text-lg">
    Supplier management page coming soon.
  </p>

</div>

  `
})

export class SuppliersComponent {}