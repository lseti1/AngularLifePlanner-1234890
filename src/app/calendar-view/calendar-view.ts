import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar-view',
  imports: [],
  templateUrl: './calendar-view.html',
  styleUrl: './calendar-view.css'
})
export class CalendarView {
  public months: string[] = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  public daysOfWeek: string[] = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public days: number[] = Array.from({ length: 42 }, (_, i) => i + 1);

  public selectedMonth: number = 0;
  public selectedDay: number = 0;
}
