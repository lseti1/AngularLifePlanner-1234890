import { Injectable, signal } from '@angular/core';
import { first } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  public currentDate: Date = new Date();
  public currentMonthIndex = signal<number>(this.getCurrentDateMonth());

  public selectedDateIndex: number = this.currentDate.getDate();
  public selectedMonthIndex: number = this.currentDate.getMonth();

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
    console.log("First of month: ", firstOfMonth.getDay());
    return firstOfMonth.getDay();
  }

  setSelectedDate(index: number): void {
    this.selectedDateIndex = index;
    console.log(this.selectedDateIndex);
  }

  setSelectedMonth(index: number): void {
    this.selectedMonthIndex = index;
    console.log(this.selectedMonthIndex);
  }
}
