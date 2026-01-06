
import { Component } from '@angular/core';
import { TerminalComponent } from './terminal.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TerminalComponent, RouterLink],
  template: `
    <section class="relative min-h-[92vh] flex flex-col pt-24 lg:pt-32 border-b border-zinc-800 bg-zinc-950 overflow-hidden">
      <!-- Background Grid -->
      <div class="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style="background-image: radial-gradient(#3b82f6 1px, transparent 1px); background-size: 32px 32px;">
      </div>
      
      <!-- Gradient Orb (Animated) -->
      <div class="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-blue-500/10 rounded-full blur-[100px] md:blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 flex-grow pb-20">
        
        <!-- Left Column: Copy -->
        <div class="lg:w-1/2 text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] md:text-xs font-mono text-zinc-400 mb-8 animate-fade-in-up shadow-sm">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            OPERATIONAL STATUS: SCALING
          </div>

          <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-8 tracking-tighter text-white">
            Infinite Scale. <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Zero Variable Costs.</span>
          </h1>

          <p class="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 font-light leading-relaxed">
            Scale your automation infrastructure on 
            <span class="text-zinc-200 font-medium">Sovereign AWS Compute</span>. 
            Escape the variable pricing trap of Zapier & Make.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 mb-16">
            <button routerLink="/pricing" class="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold transition-all shadow-[0_0_25px_rgba(37,99,235,0.25)] hover:shadow-[0_0_35px_rgba(37,99,235,0.4)] text-base md:text-lg flex items-center justify-center gap-2 active:scale-95 duration-200">
              View Architecture Tiers
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
            <button routerLink="/calculator" class="px-8 py-4 bg-transparent border border-zinc-700 hover:border-zinc-500 text-zinc-300 rounded font-bold transition-all text-base md:text-lg hover:bg-zinc-900 hover:text-white active:scale-95 duration-200">
              Calculate Savings
            </button>
          </div>

          <!-- Trust Tickers -->
          <div class="grid grid-cols-2 gap-8 opacity-80 border-t border-zinc-900 pt-8 max-w-md">
            <div>
              <div class="text-3xl font-bold font-mono text-white flex items-baseline gap-1">
                99.99<span class="text-sm text-zinc-500">%</span>
              </div>
              <div class="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 font-bold">Uptime SLA</div>
            </div>
            <div>
              <div class="text-3xl font-bold font-mono text-white flex items-baseline gap-1">
                SOC2
              </div>
              <div class="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 font-bold">Compliance Ready</div>
            </div>
          </div>
        </div>

        <!-- Right Column: Terminal -->
        <div class="lg:w-1/2 w-full flex justify-center lg:justify-end">
           <app-terminal></app-terminal>
        </div>

      </div>

      <!-- Social Proof Footer -->
      <div class="w-full border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-sm py-8">
        <div class="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-500 text-[10px] font-mono uppercase tracking-widest">
          <span>Trusted by High-Scale Teams</span>
          <div class="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
             <!-- Abstract Tech Logos -->
             <svg class="h-6 w-auto text-white" viewBox="0 0 100 30" fill="currentColor">
               <circle cx="15" cy="15" r="10" />
               <rect x="35" y="5" width="20" height="20" rx="5" />
               <path d="M70 15 L85 5 L85 25 Z" />
             </svg>
             <svg class="h-6 w-auto text-white" viewBox="0 0 100 30" fill="currentColor">
               <path d="M10 5 L30 5 L20 25 Z" />
               <circle cx="50" cy="15" r="8" />
               <rect x="75" y="10" width="20" height="10" />
             </svg>
              <svg class="h-6 w-auto text-white" viewBox="0 0 100 30" fill="currentColor">
               <rect x="10" y="5" width="10" height="20" />
               <rect x="25" y="5" width="10" height="20" />
               <path d="M50 5 L70 15 L50 25 Z" />
               <circle cx="90" cy="15" r="5" />
             </svg>
             <svg class="h-6 w-auto text-white" viewBox="0 0 100 30" fill="currentColor">
               <path d="M10 15 Q 25 5 40 15 T 70 15" stroke="currentColor" stroke-width="4" fill="none" />
               <circle cx="85" cy="15" r="8" />
             </svg>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.8; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.05); }
    }
    .animate-pulse-slow {
      animation: pulse-slow 8s infinite ease-in-out;
    }
  `]
})
export class HeroComponent {}
