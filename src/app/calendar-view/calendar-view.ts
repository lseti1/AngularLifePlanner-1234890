import { Component, computed, signal } from '@angular/core';
import { CalendarService } from '../services/calendar-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectionView } from './selection-view/selection-view';
import { LocalStorageService } from '../services/local-storage-service';

@Component({
  selector: 'app-calendar-view',
  imports: [FormsModule, CommonModule, SelectionView],
  templateUrl: './calendar-view.html',
  styleUrl: './calendar-view.css'
})
export class CalendarView {
  public months: string[] = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  public daysOfWeek: string[] = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public days: number[] = Array.from({ length: 42 }, (_, i) => i + 1);

  public selectedMonthIndex = signal<number>(0);
  public selectedDay= signal<number>(0);
  public selectedMonthFirstDayIndex = signal<number>(0);
  public selectedMonthLastDayIndex = signal<number>(0);

  public hasSelectedDate = computed(() => this.calendarService.hasSelectedDate());

  constructor(
    private calendarService: CalendarService,
    private localStorageService: LocalStorageService
  ) {
    this.selectedMonthIndex.set(this.calendarService.currentMonthIndex());
    this.selectedMonthFirstDayIndex.set(this.calendarService.getSelectedMonthStartDate(this.selectedMonthIndex()));
    this.selectedMonthLastDayIndex.set(this.calendarService.getSelectedMonthLastDate(this.selectedMonthIndex()));
  }

  setSelectedMonthIndex(index: number): void {
    this.calendarService.setSelectedMonth(index);
    this.setSelectedMonthFirstDayIndex(index);
    this.setSelectedMonthLastDayIndex(index);
  }

  setSelectedMonthFirstDayIndex(monthIndex: number): void {
    this.selectedMonthFirstDayIndex.set(this.calendarService.getSelectedMonthStartDate(monthIndex));
  }

  setSelectedMonthLastDayIndex(monthIndex: number): void {
    this.selectedMonthLastDayIndex.set(this.calendarService.getSelectedMonthLastDate(monthIndex));
    console.log(this.selectedMonthLastDayIndex());
  }

  isValidCalendarDay(day: number): boolean { // This is relating to hiding blocks before the 1st day and after the last day of the month
    const isInvalidDay = day - this.selectedMonthFirstDayIndex() + 1 < 0 || day >= this.selectedMonthLastDayIndex() + this.selectedMonthFirstDayIndex() - 1;
    return isInvalidDay;
  }

  isPastMonthDay(day: number): boolean { // This is relating to whether it's a past month and or a past day relative to current month/day
    const isPastMonth = this.selectedMonthIndex() < this.calendarService.currentMonthIndex();
    const isPastDay = day < this.calendarService.currentDate.getDate() - 1;
    return isPastMonth || isPastDay;
  }

  toggleHasSelectedDate(calendarIndex: number): void {
    this.calendarService.setHasSelectedDate(true);
    this.calendarService.setSelectedDate(calendarIndex);
  }

  isCurrentDay(day: number): boolean {
    const isToday = (day - this.selectedMonthFirstDayIndex() + 1) === this.calendarService.currentDate.getDate() - 1;
    const isThisMonth = this.calendarService.currentMonthIndex() === this.selectedMonthIndex();
    return isToday && isThisMonth;
  }
}
