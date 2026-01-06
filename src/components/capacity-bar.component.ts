
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-capacity-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="fixed bottom-0 left-0 right-0 z-50 bg-[#0d1117] border-t border-zinc-800 shadow-2xl transform transition-transform duration-500">
      <div class="container mx-auto px-6 h-14 flex items-center justify-between">
        
        <!-- Status Indicator -->
        <div class="flex items-center gap-4">
           <div class="flex items-center gap-2">
             <span class="relative flex h-3 w-3">
               <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
             </span>
             <span class="text-xs font-mono font-bold text-zinc-300 hidden sm:inline">SYSTEMS OPERATIONAL</span>
           </div>
           
           <div class="h-4 w-[1px] bg-zinc-800 hidden sm:block"></div>
           
           <div class="text-xs font-mono text-zinc-400">
             <span class="text-zinc-500 hidden sm:inline">Q1 ENGINEERING CAPACITY: </span>
             <span class="text-yellow-500 font-bold">2 SPOTS REMAINING</span>
           </div>
        </div>

        <!-- CTA -->
        <button routerLink="/contact" class="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wide transition-colors">
          <span>Secure Slot</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

      </div>
    </div>
  `
})
export class CapacityBarComponent {}
