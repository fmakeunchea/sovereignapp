
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import jsPDF from 'jspdf';

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
             <div class="bg-emerald-900/10 border border-emerald-500/30 p-6 rounded-lg text-emerald-400 animate-fade-in">
                <div class="flex items-center gap-2 mb-2">
                   <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                   <p class="font-bold text-lg text-white">Access Granted</p>
                </div>
                <p class="text-sm text-zinc-400 mb-4">Your schematic has been generated.</p>
                
                <div class="flex items-center gap-3 text-xs text-emerald-400 font-mono bg-emerald-500/10 p-3 rounded border border-emerald-500/20">
                  <svg class="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Downloading 'Sovereign_AWS_Blueprint_v2.4.pdf'...
                </div>
                
                <button (click)="downloadPdf()" class="mt-4 text-[10px] text-zinc-500 underline hover:text-zinc-300">
                  Click here if download does not start automatically.
                </button>
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
      this.submitted.set(true);
      // Generate and download PDF instantly on the client side
      setTimeout(() => this.downloadPdf(), 800);
    }
  }

  downloadPdf() {
    const doc = new jsPDF();
    const email = this.form.get('email')?.value || 'Authorized User';

    // 1. Background (Dark)
    doc.setFillColor(24, 24, 27); // Zinc 900
    doc.rect(0, 0, 210, 297, 'F');

    // 2. Header
    doc.setFont("courier", "bold");
    doc.setFontSize(10);
    doc.setTextColor(59, 130, 246); // Blue 500
    doc.text("SOVEREIGN.AI // INTERNAL SCHEMATIC", 15, 15);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(161, 161, 170); // Zinc 400
    doc.text(`LICENSED TO: ${email.toUpperCase()}`, 15, 22);
    doc.text(`GENERATED: ${new Date().toISOString()}`, 15, 27);

    // 3. Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("AWS MIGRATION TOPOLOGY", 15, 45);

    // 4. Diagram Box
    doc.setDrawColor(63, 63, 70); // Zinc 700
    doc.setLineWidth(0.5);
    doc.rect(15, 55, 180, 140);
    
    // 5. VPC Box
    doc.setDrawColor(59, 130, 246); // Blue
    doc.setLineDash([2, 2], 0);
    doc.rect(25, 65, 160, 120);
    doc.setFontSize(10);
    doc.setTextColor(59, 130, 246);
    doc.text("VPC: 10.0.0.0/16 (US-EAST-1)", 30, 72);

    // 6. Subnets
    doc.setLineDash([], 0);
    
    // Public
    doc.setDrawColor(255, 255, 255);
    doc.rect(35, 80, 60, 90);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("Public Subnet", 40, 90);
    doc.setFontSize(9);
    doc.text("[ ALB Ingress ]", 40, 105);
    doc.text("[ NAT Gateway ]", 40, 115);
    doc.text("[ Bastion Host ]", 40, 125);

    // Private
    doc.setDrawColor(16, 185, 129); // Emerald
    doc.rect(105, 80, 70, 90);
    doc.setTextColor(16, 185, 129);
    doc.setFontSize(12);
    doc.text("Private Subnet", 110, 90);
    doc.setFontSize(9);
    doc.text("[ EKS Worker Nodes ]", 110, 105);
    doc.text("[ Redis Queue ]", 110, 115);
    doc.text("[ RDS Postgres ]", 110, 125);
    doc.text("[ VPC Endpoints ]", 110, 135);

    // 7. Footer
    doc.setFontSize(8);
    doc.setTextColor(82, 82, 91); // Zinc 600
    doc.text("CONFIDENTIAL - DO NOT DISTRIBUTE. PROPERTY OF SOVEREIGN.AI", 15, 280);

    doc.save('Sovereign_AWS_Blueprint_v2.4.pdf');
  }
}
