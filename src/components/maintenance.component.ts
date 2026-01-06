
import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-24 bg-zinc-900 border-y border-zinc-800 relative overflow-hidden">
      <!-- Decorative background elements -->
      <div class="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
         <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5">
           <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
         </svg>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        
        <!-- HERO SECTION -->
        <div class="max-w-4xl mx-auto text-center mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-6 uppercase tracking-widest">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            OPERATIONAL STATUS: ACTIVE WATCHTOWER
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
            Managed Sovereignty: <br/>
            <span class="text-zinc-500">Your Private Cloud, Our Responsibility.</span>
          </h2>
          <p class="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
            We act as the fractional SRE team for your automation infrastructure. 
            You own the code and data; we own the availability, security, and 24/7 incident response.
          </p>
        </div>

        <!-- OPERATIONAL STANDARDS (Trust without Logos) -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 border-b border-zinc-800 pb-12">
           <div class="text-center">
             <div class="text-2xl font-bold text-white font-mono">100%</div>
             <div class="text-xs text-zinc-500 uppercase tracking-widest">IaC Enforcement</div>
           </div>
           <div class="text-center">
             <div class="text-2xl font-bold text-white font-mono">P0</div>
             <div class="text-xs text-zinc-500 uppercase tracking-widest">Incident Priority</div>
           </div>
           <div class="text-center">
             <div class="text-2xl font-bold text-white font-mono">SOC2</div>
             <div class="text-xs text-zinc-500 uppercase tracking-widest">Aligned Processes</div>
           </div>
           <div class="text-center">
             <div class="text-2xl font-bold text-white font-mono">< 15m</div>
             <div class="text-xs text-zinc-500 uppercase tracking-widest">Recovery Time Obj</div>
           </div>
        </div>

        <!-- FEATURE CARDS (Prevention -> Recovery -> Stability) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          <!-- Incident Response (The "Insurance") -->
          <div class="p-8 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-red-500/50 transition-colors group">
            <div class="w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center mb-6 text-red-400 group-hover:text-red-300">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Liability Transfer (SLA)</h3>
            <p class="text-zinc-400 leading-relaxed text-sm">
              We carry the pager so you don't have to. <strong>15-minute response time</strong> for P0 critical failures. We triage, patch, and recover services while your team sleeps.
            </p>
          </div>

          <!-- Observability (The "Prevention") -->
          <div class="p-8 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-blue-500/50 transition-colors group">
            <div class="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center mb-6 text-blue-400 group-hover:text-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Predictive Monitoring</h3>
            <p class="text-zinc-400 leading-relaxed text-sm">
              Prometheus & Grafana dashboards track saturation, latency, and error rates. We proactively resize worker nodes <strong>before</strong> memory pressure causes a crash.
            </p>
          </div>

          <!-- Security (The "Compliance") -->
          <div class="p-8 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-emerald-500/50 transition-colors group">
            <div class="w-12 h-12 bg-emerald-900/20 rounded-lg flex items-center justify-center mb-6 text-emerald-400 group-hover:text-emerald-300">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Zero-Drift Security</h3>
            <p class="text-zinc-400 leading-relaxed text-sm">
              Vulnerabilities don't take holidays. We perform <strong>bi-weekly OS hardening</strong>, container image updates, and audit log reviews to ensure strict compliance standards.
            </p>
          </div>

           <!-- Disaster Recovery (The "Safety Net") -->
          <div class="p-8 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-purple-500/50 transition-colors group">
            <div class="w-12 h-12 bg-purple-900/20 rounded-lg flex items-center justify-center mb-6 text-purple-400 group-hover:text-purple-300">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Business Continuity</h3>
            <p class="text-zinc-400 leading-relaxed text-sm">
              Automated daily RDS snapshots and Git-based workflow versioning. If <code class="font-mono text-zinc-300">us-east-1</code> goes down, we can re-hydrate your infrastructure in a new region in minutes.
            </p>
          </div>
        </div>

        <!-- QUALIFICATION (The "Velvet Rope") -->
        <div class="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 border border-zinc-800 bg-zinc-950/50 p-8 rounded-xl">
           <div>
             <h4 class="text-white font-bold mb-4 flex items-center gap-2">
               <span class="text-green-500">✓</span> Operational Criteria (Fit)
             </h4>
             <ul class="space-y-3 text-sm text-zinc-400">
               <li class="flex gap-2"><span class="w-1 h-1 bg-zinc-500 rounded-full mt-2"></span> Teams processing 250k+ tasks/month</li>
               <li class="flex gap-2"><span class="w-1 h-1 bg-zinc-500 rounded-full mt-2"></span> SaaS products requiring strict data residency</li>
               <li class="flex gap-2"><span class="w-1 h-1 bg-zinc-500 rounded-full mt-2"></span> CTOs who need SRE coverage without headcount</li>
             </ul>
           </div>
           <div class="border-t md:border-t-0 md:border-l border-zinc-800 md:pl-8 pt-8 md:pt-0">
             <h4 class="text-white font-bold mb-4 flex items-center gap-2">
               <span class="text-red-500">✕</span> Operational Criteria (No Fit)
             </h4>
             <ul class="space-y-3 text-sm text-zinc-400">
               <li class="flex gap-2"><span class="w-1 h-1 bg-zinc-500 rounded-full mt-2"></span> Early-stage prototypes (Stay on Zapier)</li>
               <li class="flex gap-2"><span class="w-1 h-1 bg-zinc-500 rounded-full mt-2"></span> Teams without a technical point of contact</li>
               <li class="flex gap-2"><span class="w-1 h-1 bg-zinc-500 rounded-full mt-2"></span> OpEx budgets under $5k/mo</li>
             </ul>
           </div>
        </div>

        <!-- Technical Retainer Specs -->
        <div class="mb-20">
           <div class="bg-[#0d1117] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
             <div class="p-6 border-b border-zinc-800 bg-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
               <h3 class="text-lg font-bold text-white flex items-center gap-2">
                 <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                 Retainer Technical Scope
               </h3>
               <span class="text-xs font-mono text-zinc-500 border border-zinc-800 px-2 py-1 rounded">REF: MNG-SVC-01</span>
             </div>
             <div class="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
                <div class="p-8 space-y-6">
                  <h4 class="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">Included Operations</h4>
                  <ul class="space-y-4 text-sm text-zinc-400">
                    <li class="flex justify-between border-b border-zinc-800/50 pb-2"><span>n8n Version Upgrades</span> <span class="text-zinc-200 font-mono">Monthly</span></li>
                    <li class="flex justify-between border-b border-zinc-800/50 pb-2"><span>Postgres VACUUM/Analyze</span> <span class="text-zinc-200 font-mono">Weekly</span></li>
                    <li class="flex justify-between border-b border-zinc-800/50 pb-2"><span>Log Rotation & Archival</span> <span class="text-zinc-200 font-mono">Daily</span></li>
                    <li class="flex justify-between pt-1"><span>SSL Certificate Renewal</span> <span class="text-zinc-200 font-mono">Auto</span></li>
                  </ul>
                </div>
                <div class="p-8 space-y-6">
                  <h4 class="text-red-400 text-xs font-bold uppercase tracking-wider mb-2">Service Level Agreement</h4>
                  <ul class="space-y-4 text-sm text-zinc-400">
                     <li class="flex justify-between border-b border-zinc-800/50 pb-2"><span>Critical Down (P0)</span> <span class="text-white font-mono font-bold">4 Hours</span></li>
                     <li class="flex justify-between border-b border-zinc-800/50 pb-2"><span>Workflow Error (P1)</span> <span class="text-white font-mono font-bold">24 Hours</span></li>
                     <li class="flex justify-between border-b border-zinc-800/50 pb-2"><span>Change Request (P2)</span> <span class="text-white font-mono font-bold">48 Hours</span></li>
                     <li class="flex justify-between pt-1"><span>Support Channel</span> <span class="text-white font-mono font-bold">Shared Slack</span></li>
                  </ul>
                </div>
             </div>
           </div>
        </div>

        <!-- ROI Comparison & CTA -->
        <div class="bg-zinc-950 rounded-2xl border border-zinc-800 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12">
          <div class="md:w-1/2">
            <h3 class="text-2xl font-bold text-white mb-4">Capital Efficiency Analysis</h3>
            <p class="text-zinc-400 mb-6">
              Hiring a mid-level SRE requires $150k+ salary, equity, and 3 months ramp time. 
              Our managed pod delivers senior operational coverage immediately for ~20% of the cost.
            </p>
            <div class="space-y-3">
              <div class="flex justify-between items-center text-sm border-b border-zinc-800 pb-2">
                <span class="text-zinc-500">Full-Time SRE</span>
                <span class="text-red-400 font-mono">~$12,500 / mo</span>
              </div>
              <div class="flex justify-between items-center text-sm border-b border-zinc-800 pb-2">
                <span class="text-zinc-500">Sovereign Managed Retainer</span>
                <span class="text-emerald-400 font-mono">$2,500 / mo</span>
              </div>
              <div class="flex justify-between items-center font-bold pt-2">
                <span class="text-white">Net OpEx Savings</span>
                <span class="text-blue-400 font-mono">$120,000 / yr</span>
              </div>
            </div>
          </div>
          
          <div class="md:w-1/3 bg-blue-600/10 rounded-xl p-6 border border-blue-500/20 text-center">
             <div class="text-sm text-blue-300 uppercase tracking-widest mb-2 font-bold">Limited Capacity</div>
             <p class="text-zinc-400 text-xs mb-6">Strict cap of 10 clients per pod to ensure P0 response times.</p>
             <button (click)="auditRequested.emit()" class="w-full py-3 bg-white text-black font-bold rounded hover:bg-zinc-200 transition-colors">
               Request Architecture Review
             </button>
             <div class="text-[10px] text-zinc-600 mt-3">We will tell you if you don't need us.</div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class MaintenanceComponent {
  auditRequested = output<void>();
}
