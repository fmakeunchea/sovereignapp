
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../components/hero.component';
import { LiveDashboardComponent } from '../components/live-dashboard.component';
import { FaqComponent } from '../components/faq.component';

type IndustryType = 'FinTech' | 'HealthTech' | 'AI-SaaS';

interface CaseStudy {
  industry: string;
  title: string;
  metric: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, LiveDashboardComponent, FaqComponent],
  template: `
    <app-hero></app-hero>
    
    <app-live-dashboard></app-live-dashboard>

    <!-- Industry Selector (The Authority Builder) -->
    <section class="py-16 bg-zinc-900 border-b border-zinc-800 relative overflow-hidden">
      <!-- Decorator -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="flex flex-col items-center text-center mb-12">
          <p class="text-zinc-500 text-xs font-mono mb-6 uppercase tracking-[0.2em]">Select Your Vertical to View Impact</p>
          <div class="inline-flex bg-zinc-950 rounded-xl p-1 border border-zinc-800 shadow-xl">
            @for (ind of industries; track ind) {
              <button 
                (click)="setIndustry(ind)"
                [class.bg-zinc-800]="selectedIndustry() === ind"
                [class.text-white]="selectedIndustry() === ind"
                [class.text-zinc-500]="selectedIndustry() !== ind"
                class="px-8 py-3 rounded-lg text-sm font-bold transition-all duration-300"
              >
                {{ ind }}
              </button>
            }
          </div>
        </div>

        <!-- Dynamic Case Study Card -->
        @if (activeCaseStudy(); as study) {
          <div class="max-w-4xl mx-auto bg-zinc-950 border border-zinc-800 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden animate-fade-in">
             <div class="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
             
             <div class="flex flex-col md:flex-row gap-8 items-start">
               <div class="flex-1">
                 <div class="flex items-center gap-3 mb-4">
                   <span class="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs font-mono rounded border border-blue-500/20 uppercase tracking-wide">Case Study</span>
                   <span class="text-zinc-500 text-xs font-mono">|</span>
                   <span class="text-zinc-400 text-xs font-bold uppercase">{{ study.industry }}</span>
                 </div>
                 <h3 class="text-3xl font-bold text-white mb-4 leading-tight">{{ study.title }}</h3>
                 <p class="text-zinc-400 leading-relaxed mb-6">
                   {{ study.description }}
                 </p>
                 <div class="flex flex-wrap gap-2">
                   @for (tag of study.tags; track tag) {
                     <span class="text-xs font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">#{{tag}}</span>
                   }
                 </div>
               </div>
               
               <div class="md:w-64 flex-shrink-0 bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 text-center">
                 <div class="text-zinc-500 text-xs uppercase tracking-widest mb-2">Key Outcome</div>
                 <div class="text-3xl font-bold text-emerald-400 font-mono mb-1">{{ study.metric }}</div>
                 <div class="text-zinc-600 text-xs">Verified Impact</div>
               </div>
             </div>
             
             <div class="text-center mt-8 text-sm text-zinc-500 font-mono border-t border-zinc-800 pt-4">
               Architecture Benefit: <span class="text-blue-400">{{ getIndustryBenefit() }}</span>
             </div>
          </div>
        }
      </div>
    </section>
    
    <app-faq></app-faq>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class HomeComponent {
  selectedIndustry = signal<IndustryType>('FinTech');
  
  // Explicitly type the list to ensure template type checking passes
  industries: IndustryType[] = ['FinTech', 'HealthTech', 'AI-SaaS'];
  
  caseStudies: Record<IndustryType, CaseStudy> = {
    'FinTech': {
      industry: 'FinTech',
      title: 'Scaling NeoBank Transaction Webhooks',
      metric: '$2B+ Processed',
      description: 'Migrated from Zapier Enterprise to AWS EKS. Implemented SQS Dead Letter Queues for 100% transaction delivery guarantee and PCI-DSS compliant logging.',
      tags: ['PCI-DSS', 'AWS SQS', 'EKS', 'Zero-Trust']
    },
    'HealthTech': {
      industry: 'HealthTech',
      title: 'HIPAA-Compliant Patient Data Pipeline',
      metric: 'SOC2 Type II',
      description: 'Deployed private n8n cluster with VPC Peering to RDS. Enabled audit logging for every execution. Reduced data processing latency by 90% vs SaaS alternatives.',
      tags: ['HIPAA', 'VPC Peering', 'Audit Logs', 'Encryption']
    },
    'AI-SaaS': {
      industry: 'AI-SaaS',
      title: 'High-Throughput RAG Inference Engine',
      metric: '40% Cost Reduction',
      description: 'Orchestrated GPU-worker nodes for LLM embeddings. Switched to Spot Instances for background vectorization tasks, slashing infrastructure bills instantly.',
      tags: ['GPU Workers', 'Spot Instances', 'Vector DB', 'Low Latency']
    }
  };

  activeCaseStudy = computed(() => this.caseStudies[this.selectedIndustry()]);

  setIndustry(ind: IndustryType) {
    this.selectedIndustry.set(ind);
  }

  getIndustryBenefit(): string {
    switch (this.selectedIndustry()) {
      case 'FinTech': return 'PCI-DSS Compliance via Private Subnets';
      case 'HealthTech': return 'HIPAA-Ready Logging & Data Residency';
      case 'AI-SaaS': return 'GPU-Optimized Workers for LLM Inference';
    }
  }
}
