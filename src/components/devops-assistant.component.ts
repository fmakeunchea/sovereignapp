
import { Component, inject, signal, ElementRef, ViewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DevOpsService, AssistantMessage } from '../services/devops.service';

@Component({
  selector: 'app-devops-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="py-24 bg-zinc-950 border-t border-zinc-800" id="assistant">
      <div class="container mx-auto px-6">
        
        <div class="flex flex-col items-center mb-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/20 border border-blue-500/30 text-blue-400 text-xs font-mono mb-4 uppercase tracking-widest">
            <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            AWS Control Plane
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">DevOps <span class="text-zinc-500">Assistant</span></h2>
          <p class="text-zinc-400 text-center max-w-2xl">
            Authorize remediation actions securely via n8n. No SSH keys required.
          </p>
        </div>

        <!-- Terminal Window -->
        <div class="max-w-4xl mx-auto bg-[#0d1117] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[600px] relative">
          
          <!-- Header -->
          <div class="bg-[#161b22] px-4 py-3 border-b border-zinc-800 flex justify-between items-center shrink-0">
             <div class="flex items-center gap-2">
               <div class="flex gap-1.5">
                 <div class="w-3 h-3 rounded-full bg-zinc-700"></div>
                 <div class="w-3 h-3 rounded-full bg-zinc-700"></div>
                 <div class="w-3 h-3 rounded-full bg-zinc-700"></div>
               </div>
               <span class="ml-3 text-xs font-mono text-zinc-500">n8n-bridge-connected</span>
             </div>
             <div class="text-[10px] text-zinc-600 font-mono uppercase">Secure Enclave</div>
          </div>

          <!-- Message Stream -->
          <div class="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth" #scrollContainer>
            
            @for (msg of devOps.messages(); track msg.id) {
              
              <!-- System/User Text -->
              @if (msg.type === 'text' || msg.type === 'analysis') {
                <div class="flex gap-4 animate-fade-in" [class.flex-row-reverse]="msg.role === 'user'">
                  <div class="w-8 h-8 rounded shrink-0 flex items-center justify-center border"
                       [class.bg-zinc-800]="msg.role === 'user'"
                       [class.border-zinc-700]="msg.role === 'user'"
                       [class.bg-blue-900]="msg.role !== 'user'"
                       [class.border-blue-700]="msg.role !== 'user'">
                    @if (msg.role === 'user') {
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    } @else {
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    }
                  </div>
                  <div class="max-w-[80%]">
                    <div class="text-[10px] text-zinc-500 mb-1 font-mono uppercase">{{ msg.role }} • {{ msg.timestamp | date:'HH:mm:ss' }}</div>
                    <div class="text-sm leading-relaxed whitespace-pre-wrap font-mono" 
                         [class.text-zinc-300]="msg.role === 'user'"
                         [class.text-blue-100]="msg.role !== 'user'">{{ msg.content }}</div>
                  </div>
                </div>
              }

              <!-- Approval Card -->
              @if (msg.type === 'approval_request') {
                <div class="ml-12 bg-zinc-900/50 border rounded-lg p-4 animate-fade-in"
                     [class.border-yellow-500]="msg.meta?.riskLevel === 'MEDIUM'"
                     [class.border-red-500]="msg.meta?.riskLevel === 'HIGH'"
                     [class.border-green-500]="msg.meta?.riskLevel === 'LOW'">
                  
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <h4 class="text-white font-bold text-sm flex items-center gap-2">
                        @if (msg.meta?.riskLevel === 'HIGH') { ⚠️ }
                        Proposed Action: {{ msg.meta?.actionType }}
                      </h4>
                      <p class="text-zinc-400 text-xs mt-1">{{ msg.content }}</p>
                    </div>
                    <span class="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider"
                          [class.bg-yellow-500]="msg.meta?.riskLevel === 'MEDIUM'"
                          [class.text-black]="msg.meta?.riskLevel === 'MEDIUM'"
                          [class.bg-red-500]="msg.meta?.riskLevel === 'HIGH'"
                          [class.text-white]="msg.meta?.riskLevel === 'HIGH'"
                          [class.bg-green-500]="msg.meta?.riskLevel === 'LOW'"
                          [class.text-black]="msg.meta?.riskLevel === 'LOW'">
                      RISK: {{ msg.meta?.riskLevel }}
                    </span>
                  </div>

                  <!-- Technical Details -->
                  <div class="grid grid-cols-2 gap-2 text-xs font-mono text-zinc-500 mb-4 bg-zinc-950 p-3 rounded border border-zinc-800">
                    <div>Target Resource:</div>
                    <div class="text-zinc-300 text-right">{{ msg.meta?.resourceId }}</div>
                    <div>Cost Impact:</div>
                    <div class="text-zinc-300 text-right">{{ msg.meta?.costImpact }}</div>
                  </div>

                  <!-- Actions -->
                  @if (msg.meta?.status === 'PENDING') {
                    <div class="flex gap-3">
                      <button (click)="devOps.approveAction(msg.id)" class="flex-1 bg-white text-black text-xs font-bold py-2 rounded hover:bg-zinc-200 transition-colors">
                        Approve Execution
                      </button>
                      <button (click)="devOps.denyAction(msg.id)" class="px-4 border border-zinc-700 text-zinc-400 text-xs font-bold py-2 rounded hover:bg-zinc-800 transition-colors">
                        Deny
                      </button>
                    </div>
                  } @else {
                     <div class="w-full py-2 text-center text-xs font-bold font-mono uppercase rounded"
                          [class.bg-green-900]="msg.meta?.status === 'APPROVED'"
                          [class.text-green-400]="msg.meta?.status === 'APPROVED'"
                          [class.bg-red-900]="msg.meta?.status === 'DENIED'"
                          [class.text-red-400]="msg.meta?.status === 'DENIED'">
                        Action {{ msg.meta?.status }}
                     </div>
                  }
                </div>
              }

              <!-- Execution Log -->
              @if (msg.type === 'execution_log') {
                <div class="ml-12 bg-black border border-zinc-800 rounded p-3 font-mono text-[10px] text-zinc-500 animate-fade-in">
                  <pre class="whitespace-pre-wrap">{{ msg.content }}</pre>
                </div>
              }

            }

            @if (devOps.isLoading()) {
              <div class="flex gap-4 ml-12 animate-fade-in">
                <div class="flex gap-1 items-center h-8">
                  <span class="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
                  <span class="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
                  <span class="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
                </div>
              </div>
            }
          </div>

          <!-- Input Area -->
          <div class="p-4 bg-[#161b22] border-t border-zinc-800 shrink-0">
             <div class="relative">
               <input 
                  [(ngModel)]="commandInput"
                  (keyup.enter)="sendCommand()"
                  type="text" 
                  placeholder="Ask DevOps Assistant (e.g., 'Check CPU alarm', 'Analyze cost spike')..." 
                  class="w-full bg-[#0d1117] border border-zinc-700 rounded-lg pl-4 pr-12 py-3 text-sm text-white font-mono focus:border-blue-500 outline-none transition-colors shadow-inner"
               >
               <button 
                  (click)="sendCommand()"
                  [disabled]="!commandInput || devOps.isLoading()"
                  class="absolute right-2 top-2 p-1.5 bg-zinc-800 text-zinc-400 hover:text-white rounded hover:bg-zinc-700 transition-colors disabled:opacity-50">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
               </button>
             </div>
             <div class="flex justify-between mt-2 px-1">
               <div class="text-[10px] text-zinc-600 font-mono">Run Mode: <span class="text-emerald-500">READ_ONLY</span> (Escalation Required for Write)</div>
               <div class="text-[10px] text-zinc-600 font-mono">IAM Role: <span class="text-zinc-400">arn:aws:iam::...:role/n8n-assumed-role</span></div>
             </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class DevOpsAssistantComponent {
  devOps = inject(DevOpsService);
  commandInput = '';
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor() {
    effect(() => {
      this.devOps.messages(); // Dependency
      setTimeout(() => {
        if (this.scrollContainer) {
          this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
        }
      }, 100);
    });
  }

  sendCommand() {
    if (!this.commandInput.trim()) return;
    this.devOps.sendCommand(this.commandInput);
    this.commandInput = '';
  }
}
