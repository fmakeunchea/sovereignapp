
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-specs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-24 bg-zinc-950 border-b border-zinc-800">
      <div class="container mx-auto px-6">
        <div class="flex flex-col lg:flex-row gap-16 items-center">
          
          <!-- Text Content -->
          <div class="lg:w-1/2">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6 uppercase tracking-widest">
               <span class="w-2 h-2 rounded-full bg-blue-500"></span>
               Infrastructure as Code
            </div>
            <h2 class="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Industrial-Grade <br/><span class="text-zinc-500">Architecture</span>
            </h2>
            <p class="text-zinc-400 text-lg mb-8 leading-relaxed">
              We deploy strict IaC using Terraform. Your automation logic runs inside a private VPC, completely isolated from public internet ingress.
            </p>

            <ul class="space-y-8">
              <li class="flex items-start gap-5 group">
                <div class="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-blue-500/50 group-hover:bg-blue-900/10 transition-colors duration-300">
                  <span class="text-zinc-500 group-hover:text-blue-400 font-mono text-sm transition-colors">01</span>
                </div>
                <div>
                  <h4 class="text-white font-bold mb-2 text-lg">Queue Mode Scaling</h4>
                  <p class="text-zinc-500 text-sm leading-relaxed">Redis-backed worker nodes that auto-scale horizontally based on CPU/Memory pressure. Handle 1M+ executions without bottlenecks.</p>
                </div>
              </li>
              <li class="flex items-start gap-5 group">
                <div class="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-emerald-500/50 group-hover:bg-emerald-900/10 transition-colors duration-300">
                  <span class="text-zinc-500 group-hover:text-emerald-400 font-mono text-sm transition-colors">02</span>
                </div>
                <div>
                  <h4 class="text-white font-bold mb-2 text-lg">VPC Peering & Security</h4>
                  <p class="text-zinc-500 text-sm leading-relaxed">Direct private link to your RDS/Postgres. Data never leaves your AWS environment. Zero latency. Maximum security.</p>
                </div>
              </li>
              <li class="flex items-start gap-5 group">
                <div class="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-purple-500/50 group-hover:bg-purple-900/10 transition-colors duration-300">
                  <span class="text-zinc-500 group-hover:text-purple-400 font-mono text-sm transition-colors">03</span>
                </div>
                <div>
                  <h4 class="text-white font-bold mb-2 text-lg">GitOps Workflow</h4>
                  <p class="text-zinc-500 text-sm leading-relaxed">Every workflow change is version controlled. Rollback instantly. Test in Staging, deploy to Production with CI/CD.</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Diagram Section -->
          <div class="lg:w-1/2 w-full relative group perspective-1000">
            <!-- Glow Effect behind diagram -->
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            
            <div class="relative bg-[#0d1117] border border-zinc-800 rounded-xl p-6 md:p-8 shadow-2xl overflow-hidden transform transition-transform duration-700 group-hover:scale-[1.01] group-hover:rotate-1">
              
              <!-- Responsive Diagram Wrapper -->
              <div class="overflow-x-auto pb-4 -mb-4">
                <div class="min-w-[450px]">
                  <!-- VPC Container -->
                  <div class="border-2 border-dashed border-zinc-700/30 rounded-lg p-6 relative bg-zinc-900/20 mt-6">
                    <span class="absolute -top-3 left-4 bg-[#0d1117] px-2 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                       <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                       AWS VPC (us-east-1)
                    </span>

                    <div class="flex flex-col gap-6 mt-2">
                      
                      <!-- Public Subnet -->
                      <div class="border border-zinc-800 bg-zinc-900/30 rounded p-4 relative group/subnet">
                         <div class="absolute inset-0 bg-stripes-zinc opacity-5"></div>
                         <span class="absolute top-2 right-2 text-[9px] text-zinc-600 font-mono uppercase tracking-wider">Public Subnet</span>
                         
                         <!-- ALB -->
                         <div class="flex justify-center relative z-10">
                           <div class="bg-zinc-800 border border-blue-500/30 rounded px-6 py-3 flex items-center gap-4 shadow-lg shadow-blue-900/5 w-full justify-center">
                             <div class="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-400">
                               <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                             </div>
                             <div class="text-left">
                               <div class="text-xs font-bold text-zinc-200">Application Load Balancer</div>
                               <div class="text-[10px] text-zinc-500">Ingress Controller</div>
                             </div>
                           </div>
                         </div>
                         
                         <!-- Vertical Line Connector -->
                         <div class="absolute left-1/2 -bottom-6 w-px h-6 bg-zinc-700/50 z-0"></div>
                      </div>

                      <!-- Private Subnet -->
                      <div class="border border-zinc-800 bg-zinc-900/30 rounded p-4 relative pt-8 group/subnet">
                         <span class="absolute top-2 right-2 text-[9px] text-zinc-600 font-mono uppercase tracking-wider">Private Subnet (Isolated)</span>

                         <div class="grid grid-cols-2 gap-4 relative z-10">
                            
                            <!-- Compute Cluster -->
                            <div class="col-span-2 border border-zinc-700/50 rounded p-4 bg-zinc-800/30">
                              <div class="flex justify-between items-center mb-3">
                                 <div class="text-[10px] text-zinc-500 font-mono">EKS Cluster</div>
                                 <div class="text-[9px] text-emerald-500 font-bold bg-emerald-900/20 px-1.5 py-0.5 rounded">AUTO-SCALING</div>
                              </div>
                              
                              <div class="flex gap-2 justify-center">
                                <div class="bg-zinc-900 border border-emerald-500/30 rounded p-2 flex flex-col items-center flex-1">
                                   <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mb-1 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                   <span class="text-[9px] text-emerald-100 font-bold mt-1">Worker 01</span>
                                   <div class="h-0.5 w-6 bg-zinc-800 mt-1 overflow-hidden"><div class="h-full bg-emerald-500 w-2/3"></div></div>
                                </div>
                                <div class="bg-zinc-900 border border-emerald-500/30 rounded p-2 flex flex-col items-center flex-1">
                                   <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mb-1 shadow-[0_0_8px_rgba(16,185,129,0.5)]" style="animation-delay: 300ms"></div>
                                   <span class="text-[9px] text-emerald-100 font-bold mt-1">Worker 02</span>
                                   <div class="h-0.5 w-6 bg-zinc-800 mt-1 overflow-hidden"><div class="h-full bg-emerald-500 w-1/2"></div></div>
                                </div>
                                <div class="bg-zinc-900 border border-zinc-700 border-dashed rounded p-2 flex flex-col items-center flex-1 opacity-50">
                                   <div class="w-2 h-2 rounded-full bg-zinc-600 mb-1"></div>
                                   <span class="text-[9px] text-zinc-500 mt-1">Scale +</span>
                                </div>
                              </div>
                            </div>

                            <!-- Persistence Layer -->
                            <div class="border border-zinc-700/50 rounded p-3 bg-zinc-800/30 flex items-center gap-3 hover:bg-zinc-800/50 transition-colors">
                               <div class="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center text-red-400 shrink-0">
                                 <span class="font-mono font-bold text-xs">Rd</span>
                               </div>
                               <div>
                                 <div class="text-[10px] font-bold text-zinc-300">Redis Queue</div>
                                 <div class="text-[9px] text-zinc-500">Job Persistence</div>
                               </div>
                            </div>

                            <div class="border border-zinc-700/50 rounded p-3 bg-zinc-800/30 flex items-center gap-3 hover:bg-zinc-800/50 transition-colors">
                               <div class="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                                 <span class="font-mono font-bold text-xs">Pg</span>
                               </div>
                               <div>
                                 <div class="text-[10px] font-bold text-zinc-300">RDS Postgres</div>
                                 <div class="text-[9px] text-zinc-500">Primary Data</div>
                               </div>
                            </div>
                         </div>

                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .perspective-1000 { perspective: 1000px; }
    /* Subtle stripes for background texture */
    .bg-stripes-zinc {
        background-image: linear-gradient(45deg, #27272a 25%, transparent 25%, transparent 50%, #27272a 50%, #27272a 75%, transparent 75%, transparent);
        background-size: 1rem 1rem;
    }
  `]
})
export class TechSpecsComponent {}
