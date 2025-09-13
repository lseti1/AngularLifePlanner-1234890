import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  public currentDate: Date = new Date();
  public currentMonthIndex = signal<number>(this.getCurrentDateMonth());

  public selectedDateIndex = signal<number>(this.currentDate.getDate());
  public selectedMonthIndex = signal<number>(this.currentDate.getMonth());

  public hasSelectedDate = signal<boolean>(false);

  getCurrentDate(): Date {
    return this.currentDate;
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
    console.log("Selected Month Index:", this.selectedMonthIndex);
  }

  setHasSelectedDate(value: boolean): void {
    this.hasSelectedDate.set(value);
    console.log("Has Selected Date: ", this.hasSelectedDate());
  }
}
