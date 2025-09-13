import { Injectable } from '@angular/core';

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
  private storageKey = 'appData';

  constructor(

  ) {
    this.initialiseData();
  }

  private initialiseData() {
    if (!localStorage.getItem(this.storageKey)) {
      const emptyBlocks: DateBlock[] = [];
      localStorage.setItem(this.storageKey, JSON.stringify(emptyBlocks));
    }
  }

  saveDateBlocks(blocks: DateBlock[]): void {
    localStorage.setItem('appData', JSON.stringify(blocks));
  }

  addPlan(date: number, month: number, plan: string, isCompleted: boolean): void {
    const year = 2025;
    const storedDateBlocks = localStorage.getItem('appData');
    const blocks: DateBlock[] = storedDateBlocks ? JSON.parse(storedDateBlocks) : [];

    let block = blocks.find(block => block.date === date && block.month === month && block.year === year);

    if (!block) {
      block = { id: crypto.randomUUID(), date, month, year, plans: []};
      blocks.push(block);
    }

    block.plans.push({ id: crypto.randomUUID(), title: plan, completed: isCompleted })
    this.saveDateBlocks(blocks);
  }
}
