
import { Injectable, signal, computed } from '@angular/core';

export interface CostData {
  month: number;
  saasCost: number; // Cumulative Zapier Cost
  infraCost: number; // Cumulative Sovereign Cost
  monthlySaas: number; // Snapshot of that month's bill
}

@Injectable({
  providedIn: 'root'
})
export class RoiService {
  // Inputs
  initialTasks = signal<number>(250000); // Starting volume
  growthRate = signal<number>(0.05); // 5% MoM growth
  
  // Constants
  private readonly ZAPIER_COST_PER_TASK = 0.015; // $0.015 avg per task on Enterprise
  private readonly SOVEREIGN_SETUP = 25000; // CapEx
  private readonly SOVEREIGN_RETAINER = 1500; // Managed Service OpEx

  // Computed Data for Chart
  chartData = computed(() => {
    const data: CostData[] = [];
    let cumulativeSaas = 0;
    let cumulativeInfra = this.SOVEREIGN_SETUP;
    let currentTasks = this.initialTasks();

    const months = 36; // 3 Year horizon

    for (let i = 0; i <= months; i++) {
      // Calculate SaaS Bill for this month
      // Zapier pricing tiers are roughly linear at scale
      const monthlySaasBill = currentTasks * this.ZAPIER_COST_PER_TASK;
      
      data.push({
        month: i,
        saasCost: Math.round(cumulativeSaas),
        infraCost: Math.round(cumulativeInfra),
        monthlySaas: Math.round(monthlySaasBill)
      });

      // Increment for next month
      cumulativeSaas += monthlySaasBill;
      cumulativeInfra += this.SOVEREIGN_RETAINER;

      // Apply growth
      currentTasks = currentTasks * (1 + this.growthRate());
    }

    return data;
  });

  totalSavings = computed(() => {
    const data = this.chartData();
    const final = data[data.length - 1];
    return final.saasCost - final.infraCost;
  });

  breakEvenMonth = computed(() => {
    const data = this.chartData();
    // Find first month where Cumulative SaaS > Cumulative Infra
    const breakEvenPoint = data.find(d => d.saasCost > d.infraCost);
    return breakEvenPoint ? breakEvenPoint.month : null;
  });

  updateInputs(tasks: number, growth: number) {
    this.initialTasks.set(tasks);
    this.growthRate.set(growth);
  }
}
