import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  public currentDate: Date = new Date();
  public currentMonthIndex = signal<number>(this.getCurrentDateMonth());

  public hasSelectedDate = signal<boolean>(false);
  public selectedDateIndex = signal<number>(this.currentDate.getDate());
  public selectedMonthIndex = signal<number>(this.currentDate.getMonth());
  public selectedMonthFirstDayIndex = signal<number>(0);
  public selectedMonthLastDayIndex = signal<number>(0);

  public hasSelectedPlan = signal<boolean>(false);
  public selectedPlanIndex = signal<string>('');

  constructor() {
    this.selectedMonthFirstDayIndex.set(this.getSelectedMonthStartDate(this.currentMonthIndex()));
    this.selectedMonthLastDayIndex.set(this.getSelectedMonthLastDate(this.currentMonthIndex()));
  }

  getCurrentDate(): Date {
    return this.currentDate;
  }

  getCurrentMonthIndex(): number {
    return this.currentMonthIndex();
  }

  getCurrentDateMonth(): number {
    return this.currentDate.getMonth();
  }

  getCurrentDateDay(): number {
    return this.currentDate.getDate();
  }

  getSelectedMonthStartDate(month: number): number {
    const firstOfMonth = new Date(2025, month, 1);
    console.log("First day (index) of month: ", firstOfMonth.getDay());
    return firstOfMonth.getDay();
  }

  getSelectedMonthLastDate(month: number): number {
    const lastOfMonth = new Date(2025, month + 1, 0);
    console.log("Last day (index) of month: ", lastOfMonth.getDate());
    return lastOfMonth.getDate();
  }

  setSelectedDate(index: number): void {
    this.selectedDateIndex.set(index);
    console.log("Selected Date Index:", this.selectedDateIndex);
  }

  setSelectedMonth(index: number): void {
    this.selectedMonthIndex.set(index);
    this.selectedMonthFirstDayIndex.set(this.getSelectedMonthStartDate(index));
    this.selectedMonthLastDayIndex.set(this.getSelectedMonthLastDate(index));
    console.log("Selected Month Index:", this.selectedMonthIndex);
  }

  setHasSelectedDate(value: boolean): void {
    this.hasSelectedDate.set(value);
    console.log("Has Selected Date: ", this.hasSelectedDate());
  }

  setHasSelectedPlan(value: boolean): void {
    this.hasSelectedPlan.set(value);
  }

  setSelectedPlanIndex(value: string): void {
    this.selectedPlanIndex.set(value);
  }
}
