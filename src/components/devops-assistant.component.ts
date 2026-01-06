
import { Component, inject, signal, ElementRef, ViewChild, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DevOpsService, AssistantMessage } from '../services/devops.service';

interface CommandDef {
  cmd: string;
  desc: string;
  type: 'MONITOR' | 'SCALE' | 'SECURITY' | 'COST';
}

@Component({
  selector: 'app-devops-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="py-24 bg-zinc-950 border-t border-zinc-800 min-h-screen flex flex-col" id="assistant">
      <div class="container mx-auto px-4 flex-grow flex flex-col h-full">
        
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/20 border border-blue-500/30 text-blue-400 text-xs font-mono mb-4 uppercase tracking-widest">
              <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Control Plane Active
            </div>
            <h2 class="text-3xl md:text-5xl font-bold text-white">DevOps <span class="text-zinc-600">Assistant</span></h2>
          </div>
          <div class="hidden md:block text-right text-zinc-500 text-xs font-mono">
            <div>SESSION ID: <span class="text-zinc-300">SHA-{{ sessionId }}</span></div>
            <div>ENCRYPTION: <span class="text-emerald-500">TLS 1.3 / AES-256</span></div>
          </div>
        </div>

        <!-- Main IDE Interface -->
        <div class="flex-grow bg-[#0d1117] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[700px] relative">
          
          <!-- LEFT SIDEBAR (Context) -->
          <div class="w-full md:w-64 bg-[#010409] border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col shrink-0">
             
             <!-- Sidebar Header -->
             <div class="p-4 border-b border-zinc-800">
               <div class="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-2">Connected Environment</div>
               <div class="flex items-center gap-2 text-sm text-white font-bold">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" class="h-4 w-4 grayscale opacity-80" alt="AWS">
                 aws-org-main
               </div>
             </div>

             <!-- Metrics -->
             <div class="p-4 space-y-6 flex-grow overflow-y-auto">
                
                <!-- Region Status -->
                <div>
                   <div class="text-[10px] text-zinc-600 font-mono uppercase mb-2">Primary Region</div>
                   <div class="flex items-center justify-between text-xs text-zinc-300 bg-zinc-900/50 p-2 rounded border border-zinc-800">
                      <span>us-east-1</span>
                      <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                   </div>
                </div>

                <!-- Latency -->
                <div>
                   <div class="text-[10px] text-zinc-600 font-mono uppercase mb-2">Bridge Latency</div>
                   <div class="flex items-end gap-2">
                      <span class="text-2xl font-mono text-blue-400 leading-none">24</span>
                      <span class="text-[10px] text-zinc-500 mb-1">ms</span>
                   </div>
                   <div class="h-1 bg-zinc-800 mt-2 rounded-full overflow-hidden">
                     <div class="h-full bg-blue-500 w-[20%] animate-pulse"></div>
                   </div>
                </div>

                <!-- Role -->
                <div>
                   <div class="text-[10px] text-zinc-600 font-mono uppercase mb-2">Assumed Role</div>
                   <div class="text-[10px] text-zinc-400 font-mono break-all bg-zinc-900/50 p-2 rounded border border-zinc-800">
                     arn:aws:iam::123456789:role/Sovereign-DevOps-Bridge
                   </div>
                </div>
             </div>

             <!-- Sidebar Footer -->
             <div class="p-4 border-t border-zinc-800 bg-zinc-900/20">
                <div class="flex items-center gap-2 text-[10px] text-zinc-500">
                  <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Gateway Connected
                </div>
             </div>
          </div>

          <!-- RIGHT MAIN (Chat/Terminal) -->
          <div class="flex-1 flex flex-col relative bg-[#020405]">
            
            <!-- Terminal Header -->
            <div class="bg-[#161b22] px-4 py-3 border-b border-zinc-800 flex justify-between items-center shrink-0 z-10 shadow-lg">
               <div class="flex items-center gap-2">
                 <div class="flex gap-1.5">
                   <div class="w-3 h-3 rounded-full bg-zinc-700 hover:bg-red-500 transition-colors"></div>
                   <div class="w-3 h-3 rounded-full bg-zinc-700 hover:bg-yellow-500 transition-colors"></div>
                   <div class="w-3 h-3 rounded-full bg-zinc-700 hover:bg-green-500 transition-colors"></div>
                 </div>
                 <span class="ml-3 text-xs font-mono text-zinc-400">assistantd --verbose</span>
               </div>
               <div class="flex gap-4">
                 <button (click)="clearHistory()" class="text-[10px] text-zinc-500 hover:text-white uppercase tracking-wider transition-colors">Clear Log</button>
               </div>
            </div>

            <!-- Message Stream -->
            <div class="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth relative z-0" #scrollContainer>
              <!-- Grid Pattern Overlay -->
              <div class="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

              @for (msg of devOps.messages(); track msg.id) {
                
                <!-- System/User Text -->
                @if (msg.type === 'text' || msg.type === 'analysis') {
                  <div class="flex gap-4 animate-fade-in group relative z-10" [class.flex-row-reverse]="msg.role === 'user'">
                    <!-- Avatar -->
                    <div class="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center border shadow-lg transition-colors duration-300"
                         [class.bg-blue-600]="msg.role === 'user'"
                         [class.border-blue-400]="msg.role === 'user'"
                         [class.bg-zinc-800]="msg.role !== 'user'"
                         [class.border-zinc-700]="msg.role !== 'user'">
                      @if (msg.role === 'user') {
                        <span class="font-bold text-xs text-white">YOU</span>
                      } @else {
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                      }
                    </div>

                    <!-- Bubble -->
                    <div class="max-w-[90%] md:max-w-[80%]">
                      <div class="text-[10px] text-zinc-500 mb-1.5 font-mono uppercase flex items-center gap-2" [class.justify-end]="msg.role === 'user'">
                         <span>{{ msg.role }}</span>
                         <span class="w-0.5 h-0.5 bg-zinc-600 rounded-full"></span>
                         <span>{{ msg.timestamp | date:'HH:mm:ss' }}</span>
                      </div>
                      <div class="text-[15px] leading-relaxed whitespace-pre-wrap font-mono p-5 rounded-xl border shadow-lg relative" 
                           [class.bg-blue-600]="msg.role === 'user'"
                           [class.border-blue-500]="msg.role === 'user'"
                           [class.text-white]="msg.role === 'user'"
                           [class.shadow-blue-900/20]="msg.role === 'user'"
                           
                           [class.bg-zinc-800]="msg.role !== 'user'"
                           [class.border-zinc-700]="msg.role !== 'user'"
                           [class.text-zinc-100]="msg.role !== 'user'"
                           [class.shadow-black/50]="msg.role !== 'user'">
                           {{ msg.content }}
                      </div>
                    </div>
                  </div>
                }

                <!-- Approval Card (High Stakes UI) -->
                @if (msg.type === 'approval_request') {
                  <div class="mx-auto max-w-2xl w-full animate-fade-in my-6 relative z-10">
                    <div class="bg-zinc-900 border rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] relative"
                         [class.border-yellow-500/50]="msg.meta?.riskLevel === 'MEDIUM'"
                         [class.border-red-500/50]="msg.meta?.riskLevel === 'HIGH'"
                         [class.border-green-500/50]="msg.meta?.riskLevel === 'LOW'">
                      
                      <!-- Stripe Top -->
                      <div class="h-1.5 w-full" 
                           [class.bg-yellow-500]="msg.meta?.riskLevel === 'MEDIUM'"
                           [class.bg-red-500]="msg.meta?.riskLevel === 'HIGH'"
                           [class.bg-green-500]="msg.meta?.riskLevel === 'LOW'"></div>

                      <div class="p-6">
                        <div class="flex justify-between items-start mb-6">
                          <div>
                            <div class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Intervention Required</div>
                            <h4 class="text-white font-bold text-xl flex items-center gap-2">
                              {{ msg.meta?.actionType }}
                            </h4>
                          </div>
                          <span class="px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider border shadow-inner"
                                [class.bg-yellow-500/10]="msg.meta?.riskLevel === 'MEDIUM'"
                                [class.text-yellow-500]="msg.meta?.riskLevel === 'MEDIUM'"
                                [class.border-yellow-500/20]="msg.meta?.riskLevel === 'MEDIUM'"
                                [class.bg-red-500/10]="msg.meta?.riskLevel === 'HIGH'"
                                [class.text-red-500]="msg.meta?.riskLevel === 'HIGH'"
                                [class.border-red-500/20]="msg.meta?.riskLevel === 'HIGH'"
                                [class.bg-green-500/10]="msg.meta?.riskLevel === 'LOW'"
                                [class.text-green-500]="msg.meta?.riskLevel === 'LOW'"
                                [class.border-green-500/20]="msg.meta?.riskLevel === 'LOW'">
                            RISK LEVEL: {{ msg.meta?.riskLevel }}
                          </span>
                        </div>
                        
                        <p class="text-zinc-200 text-base mb-8 border-l-4 border-zinc-700 pl-4 py-1">
                          {{ msg.content }}
                        </p>

                        <!-- Technical Details Table -->
                        <div class="bg-black/40 rounded border border-zinc-700 p-5 mb-6 grid grid-cols-2 gap-6">
                          <div>
                            <div class="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Target Resource</div>
                            <div class="text-sm text-white font-mono mt-1 bg-zinc-900 p-2 rounded border border-zinc-800 inline-block">{{ msg.meta?.resourceId }}</div>
                          </div>
                          <div>
                            <div class="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Cost Impact</div>
                            <div class="text-sm text-white font-mono mt-1 bg-zinc-900 p-2 rounded border border-zinc-800 inline-block">{{ msg.meta?.costImpact }}</div>
                          </div>
                        </div>

                        <!-- Actions -->
                        @if (msg.meta?.status === 'PENDING') {
                          <div class="flex gap-4">
                            <button (click)="devOps.approveAction(msg.id)" class="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold py-4 rounded-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center justify-center gap-3 hover:-translate-y-0.5">
                              <span>Authorize Execution</span>
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                            </button>
                            <button (click)="devOps.denyAction(msg.id)" class="px-8 border border-zinc-600 hover:border-red-500/50 hover:bg-red-900/10 text-zinc-300 hover:text-red-400 text-sm font-bold py-4 rounded-lg transition-colors">
                              Deny
                            </button>
                          </div>
                        } @else {
                           <div class="w-full py-3 text-center text-sm font-bold font-mono uppercase rounded-lg flex items-center justify-center gap-3"
                                [class.bg-emerald-900/20]="msg.meta?.status === 'APPROVED'"
                                [class.text-emerald-400]="msg.meta?.status === 'APPROVED'"
                                [class.border]="msg.meta?.status === 'APPROVED'"
                                [class.border-emerald-500/20]="msg.meta?.status === 'APPROVED'"
                                [class.bg-red-900/20]="msg.meta?.status === 'DENIED'"
                                [class.text-red-400]="msg.meta?.status === 'DENIED'"
                                [class.border-red-500/20]="msg.meta?.status === 'DENIED'">
                              @if(msg.meta?.status === 'APPROVED') { 
                                <span class="bg-emerald-500/20 p-1 rounded-full"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg></span>
                              } @else { 
                                <span class="bg-red-500/20 p-1 rounded-full"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></span>
                              }
                              Action {{ msg.meta?.status }}
                           </div>
                        }
                      </div>
                    </div>
                  </div>
                }

                <!-- Execution Log -->
                @if (msg.type === 'execution_log') {
                  <div class="ml-14 mr-14 bg-black border border-zinc-800 rounded-lg p-5 font-mono text-[11px] text-emerald-500/90 animate-fade-in shadow-inner relative overflow-hidden z-10">
                    <div class="absolute top-0 left-0 w-1 h-full bg-emerald-500/50"></div>
                    <div class="flex items-center gap-2 mb-3 border-b border-zinc-900 pb-3">
                      <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      <span class="uppercase tracking-wider text-zinc-500 font-bold">Terraform Stream</span>
                    </div>
                    <pre class="whitespace-pre-wrap font-medium leading-relaxed">{{ msg.content }}</pre>
                  </div>
                }

              }

              <!-- Loading State -->
              @if (devOps.isLoading()) {
                <div class="flex gap-4 animate-fade-in ml-2 relative z-10">
                  <div class="w-10 h-10 rounded-lg border border-blue-500/20 bg-blue-900/10 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <span class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping"></span>
                  </div>
                  <div class="flex gap-2 items-center h-10">
                    <span class="text-sm text-zinc-400 font-mono">Analyzing infrastructure state<span class="animate-pulse">...</span></span>
                  </div>
                </div>
              }
            </div>

            <!-- Input Area -->
            <div class="p-5 bg-[#161b22] border-t border-zinc-800 shrink-0 z-20 relative shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
               
               <!-- Autocomplete Dropdown -->
               @if (filteredSuggestions().length > 0) {
                 <div class="absolute bottom-full left-5 right-5 mb-2 bg-[#1c2128] border border-zinc-700 rounded-xl shadow-2xl overflow-hidden z-50 ring-1 ring-black/50">
                   @for (cmd of filteredSuggestions(); track cmd.cmd; let i = $index) {
                     <div 
                       (click)="selectSuggestion(cmd.cmd)"
                       class="px-5 py-3 flex items-center justify-between cursor-pointer border-l-4 transition-colors"
                       [class.bg-blue-900/20]="i === selectedSuggestionIndex()"
                       [class.border-blue-500]="i === selectedSuggestionIndex()"
                       [class.border-transparent]="i !== selectedSuggestionIndex()"
                       [class.hover:bg-zinc-800]="i !== selectedSuggestionIndex()"
                     >
                       <div class="flex flex-col">
                         <span class="text-white font-mono text-sm">
                           <span class="text-blue-400 font-bold">{{ commandInput }}</span>{{ cmd.cmd.slice(commandInput.length) }}
                         </span>
                         <span class="text-[10px] text-zinc-400 mt-0.5">{{ cmd.desc }}</span>
                       </div>
                       <span class="text-[9px] font-bold uppercase px-2 py-1 rounded border tracking-wider"
                            [class.text-blue-400]="cmd.type === 'MONITOR'"
                            [class.bg-blue-900/20]="cmd.type === 'MONITOR'"
                            [class.border-blue-500/20]="cmd.type === 'MONITOR'"
                            [class.text-purple-400]="cmd.type === 'SCALE'"
                            [class.bg-purple-900/20]="cmd.type === 'SCALE'"
                            [class.border-purple-500/20]="cmd.type === 'SCALE'"
                            [class.text-red-400]="cmd.type === 'SECURITY'"
                            [class.bg-red-900/20]="cmd.type === 'SECURITY'"
                            [class.border-red-500/20]="cmd.type === 'SECURITY'"
                            [class.text-green-400]="cmd.type === 'COST'"
                            [class.bg-green-900/20]="cmd.type === 'COST'"
                            [class.border-green-500/20]="cmd.type === 'COST'">
                         {{ cmd.type }}
                       </span>
                     </div>
                   }
                 </div>
               }

               <!-- Quick Actions (Chips) -->
               @if (filteredSuggestions().length === 0 && !commandInput) {
                  <div class="flex gap-2 overflow-x-auto pb-4 mb-1 no-scrollbar">
                    @for (cmd of commandLibrary.slice(0,4); track cmd.cmd) {
                      <button (click)="fillCommand(cmd.cmd)" class="whitespace-nowrap px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 hover:text-white hover:border-blue-500 hover:bg-blue-900/20 transition-all font-mono font-medium shadow-sm">
                        {{ cmd.cmd }}
                      </button>
                    }
                  </div>
               }

               <div class="relative group">
                 <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                   <span class="text-blue-500 font-mono text-xl font-bold">></span>
                 </div>
                 
                 <!-- Ghost Text (Autocomplete Hint) -->
                 @if (filteredSuggestions().length > 0 && commandInput) {
                    <div class="absolute inset-y-0 left-0 pl-12 pr-14 py-4 text-[15px] font-mono pointer-events-none flex items-center overflow-hidden">
                       <span class="opacity-0 whitespace-pre">{{ commandInput }}</span><span class="text-zinc-500 opacity-50">{{ filteredSuggestions()[selectedSuggestionIndex()].cmd.slice(commandInput.length) }}</span>
                    </div>
                 }

                 <input 
                    #cmdInput
                    [(ngModel)]="commandInput"
                    (keyup)="onKeyUp($event)"
                    (keydown)="onKeyDown($event)"
                    type="text" 
                    placeholder="Execute command (e.g., 'check cpu', 'analyze cost')" 
                    class="w-full bg-[#0d1117] border border-zinc-700 rounded-xl pl-12 pr-14 py-4 text-[15px] text-white font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all shadow-inner group-hover:border-zinc-500 relative z-10 bg-transparent placeholder-zinc-600"
                    [class.opacity-50]="devOps.isLoading()"
                    [disabled]="devOps.isLoading()"
                    autocomplete="off" 
                    autocorrect="off" 
                    autocapitalize="off" 
                    spellcheck="false"
                 >
                 <button 
                    (click)="sendCommand()"
                    [disabled]="!commandInput || devOps.isLoading()"
                    class="absolute right-3 top-3 bottom-3 aspect-square bg-zinc-800 text-zinc-400 hover:text-white hover:bg-blue-600 rounded-lg transition-all disabled:opacity-50 disabled:bg-zinc-900 flex items-center justify-center z-20 shadow-sm border border-zinc-700/50 hover:border-transparent">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                 </button>
               </div>
            </div>

            <!-- Background Grid (Visual Sugar) -->
            <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none mix-blend-overlay"></div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    .bg-grid-pattern {
      background-image: linear-gradient(to right, #1f2937 1px, transparent 1px),
                        linear-gradient(to bottom, #1f2937 1px, transparent 1px);
      background-size: 40px 40px;
      mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
    }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `]
})
export class DevOpsAssistantComponent {
  devOps = inject(DevOpsService);
  commandInput = '';
  sessionId = Math.random().toString(36).substring(2, 10).toUpperCase();
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChild('cmdInput') cmdInputRef!: ElementRef;

  // Command Library for Autocomplete
  commandLibrary: CommandDef[] = [
    { cmd: 'check cpu', desc: 'Inspect CloudWatch CPU alarms', type: 'MONITOR' },
    { cmd: 'analyze cost', desc: 'Review billing anomalies', type: 'COST' },
    { cmd: 'debug pipeline', desc: 'Investigate CI/CD failures', type: 'MONITOR' },
    { cmd: 'list workers', desc: 'Show active ASG nodes', type: 'SCALE' },
    { cmd: 'scale up', desc: 'Increase max capacity', type: 'SCALE' },
    { cmd: 'rotate keys', desc: 'Cycle IAM access keys', type: 'SECURITY' },
    { cmd: 'flush redis', desc: 'Clear job queue', type: 'SCALE' },
    { cmd: 'audit logs', desc: 'Scan for unauthorized access', type: 'SECURITY' }
  ];

  selectedSuggestionIndex = signal(0);
  
  // Computed property for filtered suggestions
  filteredSuggestions = computed(() => {
    const input = this.commandInput.toLowerCase().trim();
    if (!input) return [];
    return this.commandLibrary.filter(c => c.cmd.toLowerCase().startsWith(input));
  });

  constructor() {
    effect(() => {
      this.devOps.messages(); // Dependency
      setTimeout(() => {
        if (this.scrollContainer) {
          const el = this.scrollContainer.nativeElement;
          el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
        }
      }, 100);
    });
  }

  fillCommand(cmd: string) {
    this.commandInput = cmd;
    this.cmdInputRef?.nativeElement.focus();
    this.selectedSuggestionIndex.set(0);
  }

  selectSuggestion(cmd: string) {
    this.fillCommand(cmd);
    // Optional: Auto-send if clicked? No, let user confirm.
  }

  onKeyUp(event: KeyboardEvent) {
    // Reset index if list changes heavily? 
    // Usually handled by filteredSuggestions changing, but we want to ensure bounds.
    const max = this.filteredSuggestions().length;
    if (this.selectedSuggestionIndex() >= max && max > 0) {
      this.selectedSuggestionIndex.set(0);
    }
  }

  onKeyDown(event: KeyboardEvent) {
    const suggestions = this.filteredSuggestions();
    if (suggestions.length === 0) {
        if (event.key === 'Enter') {
            this.sendCommand();
        }
        return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedSuggestionIndex.update(i => i > 0 ? i - 1 : suggestions.length - 1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedSuggestionIndex.update(i => i < suggestions.length - 1 ? i + 1 : 0);
    } else if (event.key === 'Tab') {
      event.preventDefault();
      this.fillCommand(suggestions[this.selectedSuggestionIndex()].cmd);
    } else if (event.key === 'Enter') {
      // If valid suggestion matches exactly or user hits enter on a selection
      const selected = suggestions[this.selectedSuggestionIndex()];
      if (selected) {
         if (this.commandInput === selected.cmd) {
             this.sendCommand();
         } else {
             this.fillCommand(selected.cmd);
         }
      } else {
        this.sendCommand();
      }
    }
  }

  sendCommand() {
    if (!this.commandInput.trim()) return;
    this.devOps.sendCommand(this.commandInput);
    this.commandInput = '';
    this.selectedSuggestionIndex.set(0);
  }

  clearHistory() {
    alert("Local history cleared.");
  }
}
