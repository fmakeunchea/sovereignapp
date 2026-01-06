
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-24 bg-zinc-950 border-t border-zinc-800">
      <div class="container mx-auto px-6 max-w-4xl">
        <h2 class="text-3xl md:text-5xl font-bold text-center mb-16 text-white">
          Sovereignty <span class="text-zinc-600">FAQ</span>
        </h2>
        
        <div class="space-y-4">
          @for (item of faqs; track item.question) {
            <div class="border border-zinc-800 rounded-lg bg-zinc-900/30 overflow-hidden">
              <button 
                (click)="toggle(item)"
                class="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-zinc-900/50 transition-colors group"
              >
                <span class="font-bold text-zinc-200 group-hover:text-white transition-colors">{{ item.question }}</span>
                <span class="text-2xl text-blue-500 font-light transition-transform duration-300" [class.rotate-45]="isOpen(item)">
                  +
                </span>
              </button>
              
              @if (isOpen(item)) {
                <div class="px-6 pb-6 text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-4 animate-fade-in text-lg">
                  {{ item.answer }}
                </div>
              }
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
  `]
})
export class FaqComponent {
  openItem = signal<string | null>(null);

  faqs = [
    {
      question: "Why can't I just stay on Zapier Enterprise?",
      answer: "You can, if you enjoy burning OpEx. Zapier charges per-task. As you scale to 1M+ tasks, your bill hits $5k-$10k/mo. Our infrastructure costs ~$400/mo on AWS regardless of volume. It's a simple arbitrage of compute cost."
    },
    {
      question: "Who owns the AWS account?",
      answer: "You do. 100%. We provision the infrastructure into YOUR AWS Organization using Terraform. We hand over the keys, the documentation, and the repo. You are not renting our software; you are owning your infrastructure."
    },
    {
      question: "What happens if a worker node crashes?",
      answer: "The Auto-Scaling Group (ASG) detects the health check failure immediately. It terminates the bad node and spins up a fresh one in <45 seconds. Redis persists the queue, so no tasks are lost during the swap."
    },
    {
      question: "Do you offer ongoing maintenance?",
      answer: "Yes, but it's optional. The system is designed to be self-healing. However, we offer a quarterly retainer for security patches, n8n version upgrades, and new integration patterns."
    },
    {
      question: "How long does the migration take?",
      answer: "Typical Tier 2 migrations take 3 weeks. Week 1 is audit & architecture. Week 2 is parallel run (Staging). Week 3 is Production Cutover. We perform migrations with zero downtime using queue draining."
    }
  ];

  toggle(item: any) {
    if (this.openItem() === item.question) {
      this.openItem.set(null);
    } else {
      this.openItem.set(item.question);
    }
  }

  isOpen(item: any) {
    return this.openItem() === item.question;
  }
}
