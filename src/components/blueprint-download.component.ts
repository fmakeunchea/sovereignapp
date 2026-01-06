
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-blueprint-download',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="py-20 bg-[#0d1117] border-y border-zinc-800 relative overflow-hidden group">
      <!-- Blueprint Grid Background -->
      <div class="absolute inset-0 opacity-10 pointer-events-none" 
           style="background-image: linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px); background-size: 20px 20px;">
      </div>

      <div class="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
        
        <!-- Visual Representation of the Asset -->
        <div class="md:w-1/2 relative">
          <div class="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div class="relative bg-zinc-900 border border-blue-500/30 p-2 rounded-lg shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
             <div class="bg-zinc-950 border border-zinc-800 rounded p-6 h-[300px] flex flex-col justify-between relative overflow-hidden">
                <div class="absolute top-0 right-0 p-4 opacity-20">
                   <svg width="100" height="100" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1" fill="none" class="text-white">
                      <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                   </svg>
                </div>
                <div>
                   <div class="text-blue-500 text-xs font-mono font-bold uppercase tracking-widest mb-2">Internal Document</div>
                   <h3 class="text-2xl font-bold text-white leading-tight">Enterprise AWS<br/>Migration Blueprint</h3>
                   <div class="mt-4 space-y-2">
                      <div class="h-1 w-2/3 bg-zinc-800 rounded"></div>
                      <div class="h-1 w-1/2 bg-zinc-800 rounded"></div>
                      <div class="h-1 w-3/4 bg-zinc-800 rounded"></div>
                   </div>
                </div>
                <div class="flex justify-between items-end border-t border-zinc-800 pt-4">
                   <div class="text-zinc-500 text-[10px] font-mono">VER 2.4.0</div>
                   <div class="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">PDF</div>
                </div>
             </div>
          </div>
        </div>

        <!-- Copy & Form -->
        <div class="md:w-1/2">
          <h2 class="text-3xl font-bold text-white mb-4">
            Due Diligence Required. <br/>
            <span class="text-blue-400">Inspect our Architecture.</span>
          </h2>
          <p class="text-zinc-400 mb-6 leading-relaxed">
            Don't just take our word for it. Download the technical schematic used to process $100M+ in transaction volume.
          </p>

          <ul class="space-y-2 mb-8 text-sm text-zinc-300 font-mono">
            <li class="flex gap-2"><span class="text-blue-500">>></span> Terraform Module Structure</li>
            <li class="flex gap-2"><span class="text-blue-500">>></span> VPC Peering & Security Groups</li>
            <li class="flex gap-2"><span class="text-blue-500">>></span> Redis-Queue Scaling Logic</li>
          </ul>

          @if (submitted()) {
             <div class="bg-emerald-900/20 border border-emerald-500/50 p-6 rounded-lg text-emerald-400 animate-fade-in">
                <p class="font-bold text-lg mb-1">Blueprint Sent.</p>
                <p class="text-sm">Check your inbox for the download link.</p>
             </div>
          } @else {
             <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
                <div class="flex gap-4">
                   <label for="email" class="sr-only">Work Email</label>
                   <input 
                     id="email"
                     formControlName="email"
                     type="email" 
                     placeholder="Enter work email..." 
                     aria-label="Enter work email address"
                     class="flex-1 bg-zinc-950 border border-zinc-700 rounded p-4 text-white focus:border-blue-500 outline-none transition-colors"
                     [class.border-red-500]="form.get('email')?.touched && form.get('email')?.invalid"
                   >
                   <button 
                     type="submit" 
                     [disabled]="form.invalid"
                     class="bg-white text-black font-bold px-6 py-4 rounded hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                   >
                     Get Blueprint
                   </button>
                </div>
                <p class="text-zinc-600 text-xs text-center md:text-left pl-1">
                   Instant PDF Download. No spam.
                </p>
             </form>
          }
        </div>

      </div>
    </section>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class BlueprintDownloadComponent {
  private fb: FormBuilder = inject(FormBuilder);
  submitted = signal(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit() {
    if (this.form.valid) {
      // Simulate API call
      setTimeout(() => {
        this.submitted.set(true);
      }, 800);
    }
  }
}
