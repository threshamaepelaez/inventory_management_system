import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div *ngIf="message" class="fixed bottom-6 right-6 z-50 rounded-2xl bg-slate-900 px-5 py-3 text-sm text-white shadow-xl shadow-slate-900/20">
      {{ message }}
    </div>
  `
})
export class ToastComponent {
  @Input() message = '';
}
