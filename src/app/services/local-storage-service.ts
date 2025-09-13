import { Injectable } from '@angular/core';

export interface Plan {
  title: string;
  completed: boolean;
}

export interface dateBlock {
  date: number;
  month: number;
  year: number;
  plans: Plan[];
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  
}
