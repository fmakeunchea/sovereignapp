
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
      <nav class="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 h-16 transition-all duration-300 supports-[backdrop-filter]:bg-zinc-950/60">
        <div class="container mx-auto px-6 h-full flex items-center justify-between">
          
          <!-- Logo -->
          <a routerLink="/" class="font-bold text-xl tracking-tighter text-white hover:text-blue-400 transition-colors z-50 relative flex items-center gap-2">
            <div class="w-6 h-6 bg-gradient-to-tr from-blue-600 to-emerald-500 rounded-sm"></div>
            <span>SOVEREIGN<span class="text-blue-500">.AI</span></span>
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
          <button (click)="toggleMobileMenu()" class="md:hidden z-50 relative text-white focus:outline-none p-2 rounded hover:bg-zinc-800 transition-colors">
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
        <div class="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8 animate-fade-in md:hidden">
          <a (click)="closeMobileMenu()" routerLink="/pricing" class="text-2xl font-bold text-white hover:text-blue-400 transition-colors">Services</a>
          <a (click)="closeMobileMenu()" routerLink="/managed" class="text-2xl font-bold text-white hover:text-blue-400 transition-colors">Managed Services</a>
          <a (click)="closeMobileMenu()" routerLink="/calculator" class="text-2xl font-bold text-white hover:text-blue-400 transition-colors">ROI Calculator</a>
          <a (click)="closeMobileMenu()" routerLink="/assistant" class="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">DevOps Assistant</a>
          <a (click)="closeMobileMenu()" routerLink="/resources" class="text-2xl font-bold text-white hover:text-blue-400 transition-colors">Resources</a>
          <a (click)="closeMobileMenu()" routerLink="/contact" class="mt-4 px-8 py-4 bg-white text-black rounded font-bold text-xl hover:scale-105 transition-transform">Book Audit</a>
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
              <div class="font-bold text-xl text-white tracking-tighter mb-6 flex items-center gap-2">
                <div class="w-4 h-4 bg-zinc-800 rounded-sm"></div>
                <span>SOVEREIGN<span class="text-blue-500">.AI</span></span>
              </div>
              <p class="text-zinc-500 leading-relaxed mb-6">
                The enterprise standard for private automation infrastructure. 
                We help high-volume SaaS companies exit Zapier and own their compute.
              </p>
              <div class="flex gap-4 opacity-60">
                 <!-- Social Placeholders -->
                 <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-zinc-600 cursor-pointer transition-colors hover:bg-zinc-800 hover:text-white">
                   <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                 </a>
                 <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-zinc-600 cursor-pointer transition-colors hover:bg-zinc-800 hover:text-white">
                   <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                 </a>
                 <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-zinc-600 cursor-pointer transition-colors hover:bg-zinc-800 hover:text-white">
                   <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
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
