
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CapacityBarComponent } from './components/capacity-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CapacityBarComponent
  ],
  template: `
    <div class="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-blue-500/30 pb-14 flex flex-col relative overflow-x-hidden">
      
      <!-- Navigation -->
      <nav class="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur border-b border-zinc-800 h-16 transition-all duration-300">
        <div class="container mx-auto px-6 h-full flex items-center justify-between">
          
          <!-- Logo -->
          <a routerLink="/" class="font-bold text-xl tracking-tighter text-white hover:text-blue-400 transition-colors z-50 relative">
            SOVEREIGN<span class="text-blue-500">.AI</span>
          </a>

          <!-- Desktop Menu -->
          <div class="hidden md:flex gap-8 text-sm font-medium">
            <a routerLink="/pricing" routerLinkActive="text-white" class="hover:text-white transition-colors">Services</a>
            <a routerLink="/managed" routerLinkActive="text-white" class="hover:text-white transition-colors">Managed</a>
            <a routerLink="/calculator" routerLinkActive="text-white" class="hover:text-white transition-colors">ROI Calculator</a>
            <a routerLink="/assistant" routerLinkActive="text-white" class="hover:text-white transition-colors text-blue-400">Assistant</a>
            <a routerLink="/resources" routerLinkActive="text-white" class="hover:text-white transition-colors">Resources</a>
          </div>

          <!-- Desktop CTA -->
          <div class="hidden md:block">
            <a routerLink="/contact" class="px-4 py-2 bg-white text-black rounded text-sm font-bold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5">
              Book Audit
            </a>
          </div>

          <!-- Mobile Hamburger -->
          <button (click)="toggleMobileMenu()" class="md:hidden z-50 relative text-white focus:outline-none p-2">
            @if (!isMobileMenuOpen()) {
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            }
          </button>
        </div>
      </nav>

      <!-- Mobile Menu Overlay -->
      @if (isMobileMenuOpen()) {
        <div class="fixed inset-0 z-40 bg-zinc-950 flex flex-col justify-center items-center gap-8 animate-fade-in md:hidden">
          <a (click)="closeMobileMenu()" routerLink="/pricing" class="text-2xl font-bold text-white">Services</a>
          <a (click)="closeMobileMenu()" routerLink="/managed" class="text-2xl font-bold text-white">Managed Services</a>
          <a (click)="closeMobileMenu()" routerLink="/calculator" class="text-2xl font-bold text-white">ROI Calculator</a>
          <a (click)="closeMobileMenu()" routerLink="/assistant" class="text-2xl font-bold text-blue-400">DevOps Assistant</a>
          <a (click)="closeMobileMenu()" routerLink="/resources" class="text-2xl font-bold text-white">Resources</a>
          <a (click)="closeMobileMenu()" routerLink="/contact" class="mt-4 px-8 py-4 bg-white text-black rounded font-bold text-xl">Book Audit</a>
        </div>
      }

      <main class="pt-16 flex-grow">
        <router-outlet></router-outlet>
      </main>

      <!-- Enterprise Footer -->
      <footer class="py-16 border-t border-zinc-800 bg-zinc-950 text-sm">
        <div class="container mx-auto px-6">
          
          <!-- Responsive Grid: 1 col Mobile -> 2 col Tablet -> 4 col Desktop -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
            
            <!-- Brand Column -->
            <div class="col-span-1">
              <div class="font-bold text-xl text-white tracking-tighter mb-6">
                SOVEREIGN<span class="text-blue-500">.AI</span>
              </div>
              <p class="text-zinc-500 leading-relaxed mb-6">
                The enterprise standard for private automation infrastructure. 
                We help high-volume SaaS companies exit Zapier and own their compute.
              </p>
              <div class="flex gap-4 opacity-60">
                 <!-- Social Placeholders -->
                 <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-zinc-600 cursor-pointer transition-colors hover:bg-zinc-800 hover:text-white">
                   <span class="font-mono font-bold text-xs text-zinc-400">X</span>
                 </a>
                 <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-zinc-600 cursor-pointer transition-colors hover:bg-zinc-800 hover:text-white">
                   <span class="font-mono font-bold text-xs text-zinc-400">in</span>
                 </a>
                 <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-zinc-600 cursor-pointer transition-colors hover:bg-zinc-800 hover:text-white">
                   <span class="font-mono font-bold text-xs text-zinc-400">GH</span>
                 </a>
              </div>
            </div>

            <!-- Solutions -->
            <div>
              <h4 class="font-bold text-white mb-6 uppercase text-xs tracking-widest">Solutions</h4>
              <ul class="space-y-4 text-zinc-500 font-medium">
                <li><a routerLink="/pricing" class="hover:text-blue-400 transition-colors">Migration Audits</a></li>
                <li><a routerLink="/managed" class="hover:text-blue-400 transition-colors">Managed DevOps</a></li>
                <li><a routerLink="/architecture" class="hover:text-blue-400 transition-colors">Private VPC Setup</a></li>
                <li><a routerLink="/calculator" class="hover:text-blue-400 transition-colors">TCO Analysis</a></li>
              </ul>
            </div>

            <!-- Company -->
            <div>
              <h4 class="font-bold text-white mb-6 uppercase text-xs tracking-widest">Company</h4>
              <ul class="space-y-4 text-zinc-500 font-medium">
                <li><a routerLink="/contact" class="hover:text-white transition-colors">Contact Sales</a></li>
                <li><a routerLink="/resources" class="hover:text-white transition-colors">Engineering Blog</a></li>
                <li><a routerLink="/resources" class="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="mailto:careers@sovereign.ai" class="hover:text-white transition-colors flex items-center gap-2">
                  Careers 
                  <span class="text-[10px] bg-blue-900/30 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20">HIRING</span>
                </a></li>
              </ul>
            </div>

            <!-- Legal -->
            <div>
              <h4 class="font-bold text-white mb-6 uppercase text-xs tracking-widest">Legal & Status</h4>
              <ul class="space-y-4 text-zinc-500 font-medium">
                <li><a routerLink="/legal/privacy" class="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a routerLink="/legal/terms" class="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a routerLink="/" class="hover:text-emerald-400 transition-colors flex items-center gap-2" title="System Normal">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  All Systems Operational
                </a></li>
                <li class="pt-4 text-xs text-zinc-600">
                  SOC2 Type II Compliant <br>
                  HIPAA Ready Infrastructure
                </li>
              </ul>
            </div>

          </div>

          <div class="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 font-mono text-center md:text-left gap-4 md:gap-0">
            <div>&copy; {{ currentYear }} Sovereign Automation Inc. San Francisco, CA.</div>
            <div>id: {{ sessionID }}</div>
          </div>
        </div>
      </footer>
      
      <app-capacity-bar></app-capacity-bar>

    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class AppComponent {
  currentYear = new Date().getFullYear();
  sessionID = Math.random().toString(36).substring(7).toUpperCase();
  isMobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
