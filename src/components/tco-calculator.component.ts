
import { Component, ElementRef, ViewChild, effect, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoiService } from '../services/roi.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

declare const d3: any;

@Component({
  selector: 'app-tco-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="min-h-screen py-24 bg-zinc-950">
      <div class="container mx-auto px-6">
        
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold text-white mb-4">Calculate Your ROI</h2>
          <p class="text-zinc-400">See how much capital you recapture by owning the infrastructure.</p>
        </div>

        <div id="calculator-card" class="p-8 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm relative overflow-hidden group">
          
          <!-- High Value Stamp -->
          @if (isHighValue()) {
            <div class="absolute top-6 right-6 z-20 animate-bounce-in">
               <div class="bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                 Priority Onboarding
               </div>
            </div>
          }

          <div class="flex flex-col md:flex-row gap-12">
            
            <!-- Controls -->
            <div class="w-full md:w-1/3 space-y-8">
              <div>
                <h3 class="text-2xl font-bold text-white mb-2">Forensics Engine</h3>
                <p class="text-zinc-500 text-xs">Compare Variable OpEx vs. Fixed Infrastructure.</p>
              </div>
              
              <div class="space-y-4">
                <div class="space-y-2">
                  <label class="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Starting Monthly Tasks</label>
                  <div class="flex items-center gap-2">
                    <input 
                      type="number" 
                      [ngModel]="tasks()" 
                      (ngModelChange)="updateTasks($event)"
                      class="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:border-blue-500 outline-none font-mono"
                    >
                  </div>
                  <input 
                    type="range" 
                    min="50000" 
                    max="1000000" 
                    step="10000"
                    [ngModel]="tasks()" 
                    (ngModelChange)="updateTasks($event)"
                    class="w-full accent-blue-500 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                  >
                  <div class="flex justify-between text-[10px] text-zinc-600 font-mono">
                    <span>50k</span>
                    <span>1M+</span>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="block text-xs font-mono text-zinc-400 uppercase tracking-wider">MoM Growth Rate</label>
                  <div class="flex items-center gap-2">
                    <input 
                      type="number" 
                      [ngModel]="growth()" 
                      (ngModelChange)="updateGrowth($event)"
                      class="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white focus:border-blue-500 outline-none font-mono"
                    >
                    <span class="text-zinc-500">%</span>
                  </div>
                   <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    [ngModel]="growth()" 
                    (ngModelChange)="updateGrowth($event)"
                    class="w-full accent-blue-500 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                  >
                </div>
              </div>

              <!-- Result Box -->
              <div class="mt-8 p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-lg border border-zinc-700 shadow-inner relative">
                <div class="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <div class="text-zinc-400 text-xs font-mono uppercase tracking-widest mb-1">36-Month Net Gain</div>
                
                <div class="text-4xl font-bold text-emerald-400 font-mono tracking-tight">
                  $ {{ formatCurrency(roiService.totalSavings()) }}
                </div>
                
                <div class="mt-4 flex items-center justify-between border-t border-zinc-800 pt-3">
                   <div class="text-xs text-zinc-500">
                     Break-even: <span class="text-white font-bold">Month {{ roiService.breakEvenMonth() ?? 'N/A' }}</span>
                   </div>
                   
                   <button (click)="downloadPdf()" class="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider transition-colors">
                     <span *ngIf="!isGeneratingPdf()">Download Report</span>
                     <span *ngIf="isGeneratingPdf()">Generating...</span>
                     <svg *ngIf="!isGeneratingPdf()" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                   </button>
                </div>
              </div>
              
              @if (isHighValue()) {
                <p class="text-[10px] text-red-400 font-mono mt-2 animate-pulse">
                  * High Savings Detected. 2 Implementation Slots Remain.
                </p>
              }

            </div>

            <!-- Chart -->
            <div class="w-full md:w-2/3 flex flex-col">
               <div class="flex items-center justify-between mb-4">
                  <div class="flex gap-4">
                     <div class="flex items-center gap-2 text-xs text-zinc-400">
                        <span class="w-2 h-2 rounded-full bg-red-500"></span> SaaS Variable (Cumul.)
                     </div>
                     <div class="flex items-center gap-2 text-xs text-zinc-400">
                        <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Sovereign Fixed (Cumul.)
                     </div>
                  </div>
               </div>
               
               <div class="flex-grow bg-zinc-950 rounded border border-zinc-800 relative shadow-inner min-h-[400px]" #chartContainer></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host ::ng-deep svg { overflow: visible; }
    :host ::ng-deep .axis text { fill: #71717a; font-family: 'JetBrains Mono', monospace; font-size: 10px; }
    :host ::ng-deep .axis path, :host ::ng-deep .axis line { stroke: #27272a; }
    :host ::ng-deep .grid-line { stroke: #18181b; stroke-dasharray: 4,4; }
    .animate-bounce-in { animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
    @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.3); } 50% { opacity: 1; transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { transform: scale(1); } }
  `]
})
export class TcoCalculatorComponent {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  roiService = inject(RoiService);

  tasks = signal(250000);
  growth = signal(10);
  isGeneratingPdf = signal(false);

  // Scarcity Logic: If they save > $50k, they are a "High Value" prospect
  isHighValue = computed(() => this.roiService.totalSavings() > 50000);

  constructor() {
    effect(() => {
      const data = this.roiService.chartData();
      this.renderChart(data);
    });
  }

  updateTasks(val: number) {
    this.tasks.set(val);
    this.updateService();
  }

  updateGrowth(val: number) {
    this.growth.set(val);
    this.updateService();
  }

  updateService() {
    this.roiService.updateInputs(this.tasks(), this.growth() / 100);
  }

  formatCurrency(val: number): string {
    return new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(val);
  }

  async downloadPdf() {
    this.isGeneratingPdf.set(true);
    const element = document.getElementById('calculator-card');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#09090b', // Match bg
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      
      // Timestamp filename
      const date = new Date().toISOString().split('T')[0];
      pdf.save(`Sovereign_TCO_Report_${date}.pdf`);
    } catch (error) {
      console.error('PDF Gen Error', error);
    } finally {
      this.isGeneratingPdf.set(false);
    }
  }

  renderChart(data: any[]) {
    if (!this.chartContainer) return;
    
    const element = this.chartContainer.nativeElement;
    d3.select(element).selectAll("*").remove();

    const margin = { top: 30, right: 40, bottom: 30, left: 60 };
    const width = element.clientWidth - margin.left - margin.right;
    const height = element.clientHeight - margin.top - margin.bottom;

    const svg = d3.select(element)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Definitions for gradients
    const defs = svg.append("defs");
    
    // SaaS Gradient
    const gradientSaas = defs.append("linearGradient")
      .attr("id", "gradientSaas")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    gradientSaas.append("stop").attr("offset", "0%").attr("stop-color", "rgba(239, 68, 68, 0.3)");
    gradientSaas.append("stop").attr("offset", "100%").attr("stop-color", "rgba(239, 68, 68, 0)");

    // Infra Gradient
    const gradientInfra = defs.append("linearGradient")
      .attr("id", "gradientInfra")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    gradientInfra.append("stop").attr("offset", "0%").attr("stop-color", "rgba(16, 185, 129, 0.3)");
    gradientInfra.append("stop").attr("offset", "100%").attr("stop-color", "rgba(16, 185, 129, 0)");

    // Scales
    const x = d3.scaleLinear()
      .domain([0, 36])
      .range([0, width]);

    const maxY = Math.max(
      d3.max(data, (d: any) => d.saasCost),
      d3.max(data, (d: any) => d.infraCost)
    );

    const y = d3.scaleLinear()
      .domain([0, maxY * 1.1]) // Add 10% headroom
      .range([height, 0]);

    // Grid lines
    svg.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat("")
        .ticks(5)
      ).selectAll("line").attr("class", "grid-line");

    // Generators
    const lineSaas = d3.line()
      .x((d: any) => x(d.month))
      .y((d: any) => y(d.saasCost))
      .curve(d3.curveMonotoneX);

    const areaSaas = d3.area()
      .x((d: any) => x(d.month))
      .y0(height)
      .y1((d: any) => y(d.saasCost))
      .curve(d3.curveMonotoneX);

    const lineInfra = d3.line()
      .x((d: any) => x(d.month))
      .y((d: any) => y(d.infraCost))
      .curve(d3.curveStepAfter); // Step curve for retainer model

    // Draw SaaS Area & Line
    svg.append("path")
      .datum(data)
      .attr("fill", "url(#gradientSaas)")
      .attr("d", areaSaas);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#ef4444")
      .attr("stroke-width", 3)
      .attr("d", lineSaas);

    // Draw Infra Line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#10b981")
      .attr("stroke-width", 3)
      .attr("stroke-dasharray", "5,5")
      .attr("d", lineInfra);

    // Axes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .attr("class", "axis")
      .call(d3.axisBottom(x).ticks(6).tickFormat((d: any) => `Month ${d}`));

    svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(5).tickFormat((d: any) => `$${d/1000}k`));

    // Intersection Point (Break Even)
    const breakEven = this.roiService.breakEvenMonth();
    if (breakEven && breakEven < 36) {
      const point = data[breakEven];
      
      svg.append("circle")
        .attr("cx", x(point.month))
        .attr("cy", y(point.infraCost))
        .attr("r", 6)
        .attr("fill", "#ffffff")
        .attr("stroke", "#10b981")
        .attr("stroke-width", 2);

      svg.append("text")
        .attr("x", x(point.month))
        .attr("y", y(point.infraCost) - 15)
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .attr("font-size", "10px")
        .attr("font-weight", "bold")
        .text("ROI POSITIVE");
    }
  }
}
