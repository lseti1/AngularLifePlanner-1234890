import { Injectable, signal } from '@angular/core';
import { CalendarService } from './calendar-service';

export interface Plan {
  id: string;
  title: string;
  completed: boolean;
}

export interface DateBlock {
  id: string;
  date: number;
  month: number;
  year: number;
  plans: Plan[];
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  public blocks = signal<DateBlock[]>([]);

  private storageKey = 'appData';
  
  constructor(
    private calendarService: CalendarService
  ) {
    this.initialiseData();
    this.blocks.set(this.loadFromStorage());
  }

  private initialiseData(): void {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  private loadFromStorage(): DateBlock[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  saveDateBlocks(blocks: DateBlock[]): void {
    localStorage.setItem('appData', JSON.stringify(blocks));
    this.blocks.set(blocks);
  }

  addPlan(date: number, month: number, plan: string, isCompleted: boolean): void {
    const year = 2025;
    const blocks = [...this.blocks()];

    let block = blocks.find(block => block.date === date && block.month === month && block.year === year);

    if (!block) {
      block = { id: crypto.randomUUID(), date, month, year, plans: []};
      blocks.push(block);
    }

    block.plans.push({ id: crypto.randomUUID(), title: plan, completed: isCompleted })
    this.saveDateBlocks(blocks);
  }

  getPlans(date: number, month: number, year: number): DateBlock | undefined {
    return this.blocks().find(
      block => block.date === date && block.month === month && block.year === year
    );
  }

  togglePlanComplete(ID: string, date: number, month: number): void {
    const year = 2025;
    const blocks = [...this.blocks()];

    const block = blocks.find(block => block.date === date && block.month === month && block.year === year);
    if (!block) return;

    const plan = block.plans.find(plan => plan.id === ID);
    if (!plan) return;

    plan.completed = !plan.completed;
    this.saveDateBlocks(blocks);
  }

  removePlan(ID: string, date: number, month: number): void {
    const year = 2025;
    const blocks = [...this.blocks()];

    const block = blocks.find(block => block.date === date && block.month === month && block.year === year);
    if (!block) return;

    block.plans = block.plans.filter(plan => plan.id !== ID); // To remove the plan
    const updatedBlocks = blocks.filter(block => block.plans.length > 0); // To remove any empty blocks with no plans

    this.saveDateBlocks(updatedBlocks);
  }

  editPlan(ID: string, date: number, month: number, newTitle: string): void {
    const year = 2025;
    const blocks = [...this.blocks()];

    const block = blocks.find(block => block.date === date && block.month === month && block.year === year);
    if (!block) return;

    const plan = block.plans.find(plan => plan.id === ID);
    if (plan) plan.title = newTitle;

    this.saveDateBlocks(blocks);
  }

  clearAppData(): void {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem('welcomeSeen');
    window.location.reload();
  }

  clearPastAppData(): void {
    const blocks = [...this.blocks()];
    const year = 2025;

    const currentDate = this.calendarService.currentDate;
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate(); 
    
    const filteredBlocks = blocks.filter(block => {
        if (!block.date) return true; 
        
        if (block.year > year) return true; 
        if (block.year < year) return false; 
        
        if (block.month > currentMonth) return true; 
        if (block.month < currentMonth) return false; 
        
        return block.date >= currentDay; 
    });
    
    this.saveDateBlocks(filteredBlocks);
  }
}
