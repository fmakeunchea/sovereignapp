
import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rounded-xl bg-[#0d1117] border border-zinc-800 shadow-2xl font-mono text-xs md:text-sm overflow-hidden w-full max-w-xl mx-auto md:mr-0 opacity-95 hover:border-zinc-600 transition-colors">
      <!-- Window Controls -->
      <div class="bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-zinc-800">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div class="text-zinc-500 text-[10px] uppercase tracking-widest">terraform apply</div>
      </div>
      
      <!-- Terminal Content -->
      <div class="p-6 text-zinc-400 min-h-[320px] font-medium leading-relaxed">
        @for (line of lines(); track $index) {
          <div class="mb-1 break-words">
            <span [innerHTML]="line"></span>
          </div>
        }
        <div class="inline-block w-2 h-4 bg-zinc-500 animate-pulse align-middle ml-1"></div>
      </div>
    </div>
  `
})
export class TerminalComponent implements OnInit, OnDestroy {
  lines = signal<SafeHtml[]>([]);
  private timeoutId: any;
  private sanitizer = inject(DomSanitizer);

  sequence = [
    { text: "<span class='text-blue-400'>➜</span> <span class='text-zinc-200'>terraform init</span>", delay: 500 },
    { text: "<span class='text-green-400'>✔</span> Initializing the backend...", delay: 1200 },
    { text: "<span class='text-green-400'>✔</span> Successfully initialized!", delay: 1800 },
    { text: "<span class='text-blue-400'>➜</span> <span class='text-zinc-200'>terraform apply -auto-approve</span>", delay: 2800 },
    { text: "module.vpc.aws_vpc.main: <span class='text-yellow-400'>Creating...</span>", delay: 3500 },
    { text: "module.eks.aws_eks_cluster.main: <span class='text-yellow-400'>Creating...</span>", delay: 4500 },
    { text: "module.rds.aws_db_instance.postgres: <span class='text-yellow-400'>Creating...</span>", delay: 5500 },
    { text: "<span class='text-emerald-400'>Apply complete! Resources: 14 added, 0 changed, 0 destroyed.</span>", delay: 7000 },
    { text: "<span class='text-blue-400'>➜</span> <span class='text-zinc-200'>kubectl get pods -n n8n-system</span>", delay: 8500 },
    { text: "NAME                     READY   STATUS    AGE", delay: 9000 },
    { text: "n8n-main-7d9f8c6b4-x2z9  1/1     Running   45s", delay: 9200 },
    { text: "n8n-worker-5f4b3a1c-y8q  1/1     Running   30s", delay: 9400 },
    { text: "redis-master-0           1/1     Running   1m", delay: 9600 },
  ];

  ngOnInit() {
    this.runSequence(0);
  }

  runSequence(index: number) {
    if (index >= this.sequence.length) {
       this.timeoutId = setTimeout(() => {
         this.lines.set([]);
         this.runSequence(0);
       }, 8000);
       return;
    }

    const step = this.sequence[index];
    this.timeoutId = setTimeout(() => {
      // Use bypassSecurityTrustHtml to prevent sanitization warnings for the color classes
      this.lines.update(l => [...l, this.sanitizer.bypassSecurityTrustHtml(step.text)]);
      this.runSequence(index + 1);
    }, step.delay - (index > 0 ? this.sequence[index - 1].delay : 0));
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }
}
