
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="py-24 bg-zinc-950 relative overflow-hidden">
      <!-- Background Glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="container mx-auto px-6 relative z-10">
        
        <!-- FINANCIAL FORENSICS TABLE -->
        <div class="mb-32 max-w-5xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">Financial <span class="text-emerald-500">Forensics</span></h2>
            <p class="text-zinc-400 max-w-2xl mx-auto text-lg">
              The "Success Tax" Audit. A 36-month TCO analysis of a SaaS company scaling from 50k to 500k monthly tasks.
            </p>
          </div>

          <div class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
            <div class="grid grid-cols-4 bg-zinc-950 border-b border-zinc-800 text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 p-4">
              <div class="col-span-1">Growth Stage</div>
              <div class="col-span-1 text-right text-red-400">Zapier / Make (OpEx)</div>
              <div class="col-span-1 text-right text-blue-400">Sovereign (AWS)</div>
              <div class="col-span-1 text-right text-emerald-400">Net Capital Recaptured</div>
            </div>

            <!-- Year 1 -->
            <div class="grid grid-cols-4 border-b border-zinc-800/50 p-6 items-center hover:bg-zinc-800/20 transition-colors">
              <div class="col-span-1">
                <div class="text-white font-bold">Year 1</div>
                <div class="text-zinc-500 text-sm">50k tasks/mo</div>
              </div>
              <div class="col-span-1 text-right font-mono text-zinc-300">
                $7,200
              </div>
              <div class="col-span-1 text-right font-mono text-zinc-300">
                <span class="text-xs text-zinc-600 mr-2 hidden md:inline">(Setup*)</span> $25,000
              </div>
              <div class="col-span-1 text-right font-mono text-red-500">
                -$17,800
              </div>
            </div>

            <!-- Year 2 -->
            <div class="grid grid-cols-4 border-b border-zinc-800/50 p-6 items-center hover:bg-zinc-800/20 transition-colors">
              <div class="col-span-1">
                <div class="text-white font-bold">Year 2</div>
                <div class="text-zinc-500 text-sm">250k tasks/mo</div>
              </div>
              <div class="col-span-1 text-right font-mono text-zinc-300">
                $24,000
              </div>
              <div class="col-span-1 text-right font-mono text-zinc-300">
                $4,800
              </div>
              <div class="col-span-1 text-right font-mono text-emerald-400">
                +$19,200
              </div>
            </div>

            <!-- Year 3 -->
            <div class="grid grid-cols-4 border-b border-zinc-800/50 p-6 items-center hover:bg-zinc-800/20 transition-colors bg-blue-900/5">
              <div class="col-span-1">
                <div class="text-white font-bold">Year 3</div>
                <div class="text-zinc-500 text-sm">500k+ tasks/mo</div>
              </div>
              <div class="col-span-1 text-right font-mono text-zinc-300">
                $48,000
              </div>
              <div class="col-span-1 text-right font-mono text-zinc-300">
                $4,800
              </div>
              <div class="col-span-1 text-right font-mono text-emerald-400 font-bold">
                +$43,200
              </div>
            </div>

            <!-- Totals -->
            <div class="grid grid-cols-4 bg-zinc-950 p-6 items-center">
              <div class="col-span-1">
                <div class="text-zinc-400 font-bold uppercase tracking-widest text-xs">3-Year TCO</div>
              </div>
              <div class="col-span-1 text-right font-mono text-red-400 font-bold text-lg">
                $79,200
              </div>
              <div class="col-span-1 text-right font-mono text-blue-400 font-bold text-lg">
                $34,600
              </div>
              <div class="col-span-1 text-right font-mono text-emerald-400 font-bold text-xl border-l border-zinc-800 pl-4">
                $44,600 Saved
              </div>
            </div>
          </div>
          <div class="mt-4 text-center">
            <p class="text-zinc-500 text-xs italic max-w-2xl mx-auto">
              * Year 1 includes one-time Migration Setup Fee ($25k). Net savings accelerate significantly in Year 2 and 3 as SaaS variable costs (per-task pricing) compound linearly against fixed infrastructure costs.
            </p>
          </div>
        </div>

        <!-- TIERS HEADER -->
        <div class="text-center mb-20">
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-white">Infrastructure <span class="text-zinc-600">/</span> Tiers</h2>
          <p class="text-zinc-400 text-lg">Fixed-cost implementation. Zero recurring agency fees. You own the code.</p>
        </div>

        <!-- PRICING CARDS -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-24">
          
          <!-- Tier 1 -->
          <div class="p-8 rounded-2xl bg-zinc-900/50 backdrop-blur border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group hover:-translate-y-1">
            <div class="text-zinc-500 font-mono text-xs font-bold tracking-widest mb-4">TIER 1 — STARTUP</div>
            <h3 class="text-2xl font-bold text-white mb-2">Migration Core</h3>
            <div class="flex items-baseline gap-2 mb-6">
              <span class="text-4xl font-bold text-white">$7,500</span>
              <span class="text-sm text-zinc-500">one-time</span>
            </div>
            
            <p class="text-zinc-400 text-sm mb-8 min-h-[60px] leading-relaxed">
              Perfect for startups exiting Zapier. Single instance Docker deployment on EC2 with auto-backups.
            </p>

            <ul class="space-y-4 mb-8 text-sm text-zinc-300">
              <li class="flex gap-3 items-center"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> AWS EC2 (t3.medium)</li>
              <li class="flex gap-3 items-center"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Docker Compose Setup</li>
              <li class="flex gap-3 items-center"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Caddy Reverse Proxy</li>
              <li class="flex gap-3 items-center"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Daily S3 Backups</li>
              <li class="flex gap-3 items-center"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Basic Auth Security</li>
            </ul>

            <button routerLink="/contact" class="w-full py-4 rounded-lg border border-zinc-700 text-white font-bold hover:bg-zinc-800 transition-all text-sm uppercase tracking-wide">
              Select Tier 1
            </button>
          </div>

          <!-- Tier 2 (Highlighted) -->
          <div class="p-8 rounded-2xl bg-zinc-900 border border-blue-500/50 shadow-[0_0_40px_rgba(37,99,235,0.15)] relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
            <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            <div class="absolute top-4 right-4 bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2 py-1 rounded border border-blue-500/20 uppercase tracking-widest">Most Popular</div>
            
            <div class="text-blue-400 font-mono text-xs font-bold tracking-widest mb-4">TIER 2 — GROWTH</div>
            <h3 class="text-2xl font-bold text-white mb-2">High Availability</h3>
            <div class="flex items-baseline gap-2 mb-6">
              <span class="text-5xl font-bold text-white tracking-tight">$25,000</span>
              <span class="text-sm text-zinc-500">one-time</span>
            </div>
            
            <p class="text-zinc-300 text-sm mb-8 min-h-[60px] leading-relaxed">
              Production-grade cluster. Worker nodes separate from webhook receivers. Zero downtime updates.
            </p>

            <ul class="space-y-4 mb-8 text-sm text-white">
              <li class="flex gap-3 items-center"><span class="text-blue-400">✓</span> <strong>Redis Queue Mode</strong></li>
              <li class="flex gap-3 items-center"><span class="text-blue-400">✓</span> Separate Worker Nodes</li>
              <li class="flex gap-3 items-center"><span class="text-blue-400">✓</span> AWS RDS (Postgres)</li>
              <li class="flex gap-3 items-center"><span class="text-blue-400">✓</span> Application Load Balancer</li>
              <li class="flex gap-3 items-center"><span class="text-blue-400">✓</span> Auto-Scaling Groups</li>
            </ul>

            <button routerLink="/contact" class="w-full py-4 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-lg text-sm uppercase tracking-wide">
              Start Implementation
            </button>
          </div>

          <!-- Tier 3 -->
          <div class="p-8 rounded-2xl bg-zinc-900/50 backdrop-blur border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group hover:-translate-y-1">
            <div class="text-zinc-500 font-mono text-xs font-bold tracking-widest mb-4">TIER 3 — ENTERPRISE</div>
            <h3 class="text-2xl font-bold text-white mb-2">Sovereign Cluster</h3>
            <div class="flex items-baseline gap-2 mb-6">
              <span class="text-4xl font-bold text-white">$50,000</span>
              <span class="text-sm text-zinc-500">one-time</span>
            </div>
            
            <p class="text-zinc-400 text-sm mb-8 min-h-[60px] leading-relaxed">
              Full Kubernetes (EKS) orchestration for FinTech/HealthTech compliance. Private Networking.
            </p>

            <ul class="space-y-4 mb-8 text-sm text-zinc-300">
              <li class="flex gap-3 items-center"><span class="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-white transition-colors"></span> <strong>AWS EKS Cluster</strong></li>
              <li class="flex gap-3 items-center"><span class="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-white transition-colors"></span> Multi-AZ Deployment</li>
              <li class="flex gap-3 items-center"><span class="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-white transition-colors"></span> VPC Peering / VPN</li>
              <li class="flex gap-3 items-center"><span class="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-white transition-colors"></span> Prometheus & Grafana</li>
              <li class="flex gap-3 items-center"><span class="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-white transition-colors"></span> SOC2 Compliance Pack</li>
            </ul>

            <button routerLink="/contact" class="w-full py-4 rounded-lg border border-zinc-700 text-white font-bold hover:bg-zinc-800 transition-all text-sm uppercase tracking-wide">
              Select Tier 3
            </button>
          </div>

        </div>

        <!-- Tech Stack Strip (Credibility) -->
        <div class="border-t border-zinc-800 pt-16 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
           <div>
             <div class="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-2">Validated Stack</div>
             <p class="text-zinc-400 text-sm">Every deployment is verified against AWS Well-Architected Framework.</p>
           </div>
           <div class="flex gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <!-- Simple text representations for icons for reliability -->
              <span class="font-bold text-zinc-300 text-xl tracking-tighter">AWS</span>
              <span class="font-bold text-zinc-300 text-xl tracking-tighter">Terraform</span>
              <span class="font-bold text-zinc-300 text-xl tracking-tighter">Docker</span>
              <span class="font-bold text-zinc-300 text-xl tracking-tighter">Kubernetes</span>
              <span class="font-bold text-zinc-300 text-xl tracking-tighter">n8n</span>
           </div>
        </div>

      </div>
    </section>
  `
})
export class ServicesComponent {}
