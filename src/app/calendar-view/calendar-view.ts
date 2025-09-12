import { Component, computed, signal } from '@angular/core';
import { CalendarService } from '../services/calendar-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectionView } from './selection-view/selection-view';

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

  public selectedMonthIndex: number;
  public selectedDay: number = 0;
  public selectedMonthFirstDayIndex = signal<number>(0);
  public selectedMonthLastDayIndex = signal<number>(0);

  public hasSelectedDate = computed(() => this.calendarService.hasSelectedDate());

  constructor(
    private calendarService: CalendarService
  ) {
    this.selectedMonthIndex = this.calendarService.currentMonthIndex();
    this.selectedMonthFirstDayIndex.set(this.calendarService.getSelectedMonthStartDate(this.selectedMonthIndex));
    this.selectedMonthLastDayIndex.set(this.calendarService.getSelectedMonthLastDate(this.selectedMonthIndex));
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

  isValidCalendarDay(day: number): boolean {
    return day - this.selectedMonthFirstDayIndex() + 1 < 0 || day >= this.selectedMonthLastDayIndex() + this.selectedMonthFirstDayIndex() - 1;
  }

  toggleHasSelectedDate(): void {
    this.calendarService.setHasSelectedDate(true);
  }
}
