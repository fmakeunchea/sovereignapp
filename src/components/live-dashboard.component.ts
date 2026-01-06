
import { Component, signal, effect, OnDestroy, ElementRef, ViewChild, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LogEntry {
  id: number;
  timestamp: string;
  type: 'INFO' | 'WARN' | 'SUCCESS' | 'SCALE';
  message: string;
}

@Component({
  selector: 'app-live-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-12 bg-[#050505] border-y border-zinc-900">
      <div class="container mx-auto px-6">
        
        <div class="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
          <div>
            <div class="inline-flex items-center gap-2 mb-2">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span class="text-xs font-mono text-emerald-500 uppercase tracking-widest">Live Telemetry</span>
            </div>
            <h2 class="text-2xl font-bold text-white">Production Cluster <span class="text-zinc-600">US-EAST-1</span></h2>
          </div>
          <div class="text-right">
            <div class="text-xs text-zinc-500 font-mono uppercase tracking-widest mb-1">Real-time Cost Savings (vs Zapier)</div>
            <div class="text-3xl font-mono font-bold text-blue-400">
              $ {{ savings().toFixed(4) }}
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Metric Cards -->
          <div class="lg:col-span-1 space-y-4">
            <!-- Throughput -->
            <div class="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg relative overflow-hidden group">
              <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-blue-500">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div class="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-2">Throughput</div>
              <div class="flex items-baseline gap-2">
                <span class="text-4xl font-bold text-white">{{ rps() }}</span>
                <span class="text-sm text-zinc-400">req/sec</span>
              </div>
              <div class="mt-4 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div class="h-full bg-blue-500 transition-all duration-300" [style.width.%]="(rps() / 200) * 100"></div>
              </div>
            </div>

            <!-- Active Workers -->
            <div class="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg relative overflow-hidden">
              <div class="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-2">Auto-Scaling Nodes</div>
              <div class="flex items-baseline gap-2">
                <span class="text-4xl font-bold text-white">{{ workers() }}</span>
                <span class="text-sm text-zinc-400">active pods</span>
              </div>
              <div class="mt-4 flex gap-1">
                @for (i of [].constructor(workers()); track i) {
                  <div class="h-2 w-2 rounded-sm bg-emerald-500 animate-pulse"></div>
                }
              </div>
            </div>

            <!-- Queue Depth -->
            <div class="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg relative overflow-hidden">
              <div class="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-2">Redis Queue Depth</div>
              <div class="flex items-baseline gap-2">
                <span class="text-4xl font-bold" [class.text-white]="queueDepth() < 500" [class.text-yellow-500]="queueDepth() >= 500">{{ queueDepth() }}</span>
                <span class="text-sm text-zinc-400">pending jobs</span>
              </div>
               <div class="text-[10px] text-zinc-600 mt-2 font-mono">
                 Latency: {{ queueDepth() > 100 ? '45ms' : '12ms' }}
               </div>
            </div>
          </div>

          <!-- Live Log Stream -->
          <div class="lg:col-span-2 bg-[#0d1117] border border-zinc-800 rounded-lg flex flex-col font-mono text-xs overflow-hidden shadow-2xl">
            <div class="bg-zinc-900/80 px-4 py-2 border-b border-zinc-800 flex justify-between items-center">
              <span class="text-zinc-400">/var/log/n8n-worker.log</span>
              <div class="flex gap-2">
                 <span class="w-2 h-2 rounded-full bg-zinc-600"></span>
                 <span class="w-2 h-2 rounded-full bg-zinc-600"></span>
              </div>
            </div>
            <div class="p-4 overflow-y-auto h-[300px] space-y-2" #logContainer>
              @for (log of logs(); track log.id) {
                <div class="flex gap-3 opacity-90 animate-fade-in">
                  <span class="text-zinc-600 shrink-0">[{{ log.timestamp }}]</span>
                  
                  @switch (log.type) {
                    @case ('INFO') { <span class="text-blue-400 w-12 shrink-0">INFO</span> }
                    @case ('WARN') { <span class="text-yellow-400 w-12 shrink-0">WARN</span> }
                    @case ('SUCCESS') { <span class="text-emerald-400 w-12 shrink-0">OK</span> }
                    @case ('SCALE') { <span class="text-purple-400 w-12 shrink-0">SCALE</span> }
                  }
                  
                  <span class="text-zinc-300 break-all">{{ log.message }}</span>
                </div>
              }
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
    /* Hide scrollbar for clean look */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
  `]
})
export class LiveDashboardComponent implements OnDestroy {
  @ViewChild('logContainer') logContainer!: ElementRef;

  // Signals
  rps = signal(42);
  workers = signal(3);
  queueDepth = signal(12);
  savings = signal(1240.50);
  logs = signal<LogEntry[]>([]);
  
  private intervalId: any;
  private logIdCounter = 0;

  constructor() {
    this.startSimulation();
    
    // Auto-scroll logs
    effect(() => {
      this.logs(); // Dependency
      setTimeout(() => {
        if (this.logContainer) {
          this.logContainer.nativeElement.scrollTop = this.logContainer.nativeElement.scrollHeight;
        }
      }, 50);
    });
  }

  startSimulation() {
    this.intervalId = setInterval(() => {
      this.tick();
    }, 800);
  }

  tick() {
    // 1. Randomize RPS with occasional spikes
    const isSpike = Math.random() > 0.8;
    const baseRps = isSpike ? Math.floor(Math.random() * 150) + 100 : Math.floor(Math.random() * 40) + 20;
    this.rps.set(baseRps);

    // 2. Adjust Workers based on RPS
    const targetWorkers = Math.ceil(baseRps / 40) + 1; // 1 worker per 40 RPS + 1 baseline
    if (targetWorkers > this.workers()) {
      this.workers.update(w => w + 1);
      this.addLog('SCALE', `ASG Scaling Policy Triggered: Adding Node ip-10-0-2-${Math.floor(Math.random() * 255)}`);
    } else if (targetWorkers < this.workers() && Math.random() > 0.7) {
      this.workers.update(w => Math.max(2, w - 1)); // Min 2 workers
    }

    // 3. Queue Depth (simulated pressure)
    if (isSpike) {
      this.queueDepth.update(q => q + Math.floor(Math.random() * 50));
      this.addLog('WARN', `Queue Pressure High: ${this.queueDepth()} pending jobs.`);
    } else {
      this.queueDepth.update(q => Math.max(0, q - Math.floor(Math.random() * 60)));
    }

    // 4. Update Savings ($0.015 per task is Zapier rate, our cost is negligible per tick)
    const processedInThisTick = baseRps * 0.8; // 0.8s interval
    const savingsThisTick = processedInThisTick * 0.015;
    this.savings.update(s => s + savingsThisTick);

    // 5. Generate Random Operational Log
    this.generateRandomLog(baseRps);
  }

  generateRandomLog(currentRps: number) {
    // Define exact union type for actions to avoid ts-ignore
    const actions: { type: 'INFO' | 'WARN' | 'SUCCESS' | 'SCALE'; msg: string }[] = [
      { type: 'SUCCESS', msg: `Processed batch #${Math.floor(Math.random() * 99999)} (${Math.floor(Math.random() * 50)} items)` },
      { type: 'INFO', msg: `POST /webhook/stripe-payment 202 Accepted` },
      { type: 'INFO', msg: `GET /api/v1/health-check 200 OK - 2ms` },
      { type: 'SUCCESS', msg: `DB: Inserted ${Math.floor(Math.random() * 10)} rows into 'transactions'` },
    ];

    const action = actions[Math.floor(Math.random() * actions.length)];
    this.addLog(action.type, action.msg);
  }

  addLog(type: 'INFO' | 'WARN' | 'SUCCESS' | 'SCALE', message: string) {
    const now = new Date();
    const timeString = now.toISOString().split('T')[1].slice(0, 8); // HH:MM:SS
    
    this.logs.update(logs => {
      const newLogs = [...logs, {
        id: this.logIdCounter++,
        timestamp: timeString,
        type,
        message
      }];
      if (newLogs.length > 50) newLogs.shift(); // Keep logs clean
      return newLogs;
    });
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
