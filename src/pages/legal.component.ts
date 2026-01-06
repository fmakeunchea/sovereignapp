
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-zinc-950 pt-32 pb-24 border-b border-zinc-800">
      <div class="container mx-auto px-6 max-w-3xl">
        
        <div class="mb-12">
          <span class="text-blue-500 font-mono text-xs uppercase tracking-widest mb-2 block">Legal Documentation</span>
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-6 capitalize">{{ documentType()?.replace('-', ' ') }}</h1>
          <div class="h-1 w-24 bg-zinc-800 rounded"></div>
        </div>

        <div class="prose prose-invert prose-zinc max-w-none">
          <p class="text-xl text-zinc-300 leading-relaxed mb-8">
            This {{ documentType()?.replace('-', ' ') }} is effective as of {{ today | date:'longDate' }}. 
            By accessing Sovereign.ai infrastructure services, you agree to be bound by these terms.
          </p>

          <h3 class="text-white font-bold text-xl mb-4 mt-12">1. Infrastructure Ownership</h3>
          <p class="text-zinc-400 mb-6">
            Unlike standard SaaS agreements, Sovereign.ai provisions resources directly into the Client's AWS Account. 
            The Client retains 100% intellectual property rights and administrative access to all Terraform modules, 
            container images, and database snapshots generated during the engagement.
          </p>

          <h3 class="text-white font-bold text-xl mb-4 mt-8">2. Liability & SLAs</h3>
          <p class="text-zinc-400 mb-6">
            For Managed Services clients, Sovereign.ai guarantees a 15-minute response time for P0 incidents. 
            Liability is capped at 3x the monthly retainer fee. For "One-time Migration" clients, 
            software is provided "as is" after the 30-day warranty period expires.
          </p>

          <h3 class="text-white font-bold text-xl mb-4 mt-8">3. Data Residency</h3>
          <p class="text-zinc-400 mb-6">
            We do not store your transaction data. All data processing occurs within your Virtual Private Cloud (VPC). 
            Our access is limited to metadata required for monitoring and orchestration (CPU usage, Error rates, Deployment logs).
          </p>

          <div class="mt-16 p-6 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-500 font-mono">
            Last Updated: {{ today | date:'mediumDate' }} <br>
            Compliance Officer: legal@sovereign.ai
          </div>
        </div>

      </div>
    </div>
  `
})
export class LegalComponent {
  private route = inject(ActivatedRoute);
  
  // Reliably get the 'type' from the route data
  documentType = toSignal(
    this.route.data.pipe(map(data => data['type'] as string)), 
    { initialValue: 'Terms of Service' }
  );
  
  today = new Date();
}
