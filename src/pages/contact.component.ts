
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MaintenanceComponent } from '../components/maintenance.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaintenanceComponent],
  template: `
    <!-- Maintenance Component acts as the "Managed Services" page/section content -->
    <app-maintenance></app-maintenance>

    <section id="contact-form" class="py-24 bg-zinc-950 border-t border-zinc-800">
       <div class="container mx-auto px-6 max-w-4xl">
         
         <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
           
           <!-- Left: Value Prop & Trust -->
           <div>
              <h2 class="text-3xl font-bold text-white mb-6">Request Architecture Review</h2>
              <p class="text-zinc-400 mb-8 leading-relaxed">
                Stop guessing. Let our Senior Solutions Architect review your current Zapier/Make sprawl and build a custom migration roadmap.
              </p>
              
              <div class="space-y-6">
                <div class="flex gap-4">
                  <div class="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">1</div>
                  <div>
                    <h4 class="text-white font-bold text-sm">30-Minute Technical Discovery</h4>
                    <p class="text-zinc-500 text-xs">We analyze your workflow complexity and volume.</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">2</div>
                  <div>
                    <h4 class="text-white font-bold text-sm">TCO & Roadmap Delivery</h4>
                    <p class="text-zinc-500 text-xs">Receive a 3-Year TCO comparison PDF.</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">3</div>
                  <div>
                    <h4 class="text-white font-bold text-sm">Go/No-Go Decision</h4>
                    <p class="text-zinc-500 text-xs">No obligation. We will tell you if you don't need us.</p>
                  </div>
                </div>
              </div>

              <div class="mt-8">
                 <div class="text-xs font-mono text-yellow-500 uppercase tracking-widest mb-1">Capacity Alert</div>
                 <p class="text-zinc-400 text-sm">Current Capacity: 2 Slots Remaining for Q1.</p>
              </div>

              <div class="mt-10 p-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden">
                   <!-- Placeholder Avatar -->
                   <svg class="w-full h-full text-zinc-600" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <div>
                  <div class="text-white font-bold text-sm">Alex V.</div>
                  <div class="text-zinc-500 text-xs uppercase tracking-wider">Lead Architect</div>
                </div>
              </div>
           </div>

           <!-- Right: Form -->
           <form [formGroup]="auditForm" (ngSubmit)="onSubmit()" class="bg-zinc-950 p-8 rounded-xl border border-zinc-800 shadow-xl">
             @if (formSubmitted()) {
               <div class="h-full flex flex-col items-center justify-center text-center p-4">
                 <div class="w-16 h-16 bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/20">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <p class="font-bold text-white text-lg">Request Received</p>
                 <p class="text-zinc-400 text-sm mt-2">Alex will reach out within 24 hours to schedule your slot.</p>
               </div>
             } @else {
               <div class="space-y-4">
                 <div class="space-y-1">
                   <label class="text-xs font-bold text-zinc-500 uppercase">Company Name</label>
                   <input formControlName="name" type="text" class="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white focus:border-blue-500 outline-none transition-colors">
                 </div>
                 
                 <div class="space-y-1">
                   <label class="text-xs font-bold text-zinc-500 uppercase">Work Email</label>
                   <input formControlName="email" type="email" class="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white focus:border-blue-500 outline-none transition-colors">
                 </div>

                 <div class="space-y-1">
                   <label class="text-xs font-bold text-zinc-500 uppercase">Current Automation Tool URL</label>
                   <input formControlName="companyUrl" type="text" placeholder="https://..." class="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white focus:border-blue-500 outline-none transition-colors">
                 </div>

                 <button type="submit" [disabled]="auditForm.invalid" class="w-full py-4 bg-white text-black font-bold rounded hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 shadow-lg">
                   Request Architecture Review
                 </button>
                 
                 <div class="text-center text-[10px] text-zinc-600 mt-4">
                   Strict NDA Protocols. Your infrastructure data remains 100% confidential.
                 </div>
               </div>
             }
           </form>

         </div>
       </div>
    </section>
  `
})
export class ContactComponent {
  private fb: FormBuilder = inject(FormBuilder);

  auditForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    companyUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
  });

  formSubmitted = signal(false);

  onSubmit() {
    if (this.auditForm.valid) {
      this.formSubmitted.set(true);
      // Simulate API call
      console.log('Audit Request:', this.auditForm.value);
    }
  }
}
