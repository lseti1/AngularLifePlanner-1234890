import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CalendarService } from '../../services/calendar-service';

@Component({
  selector: 'app-selection-view',
  imports: [FormsModule, CommonModule],
  templateUrl: './selection-view.html',
  styleUrl: './selection-view.css'
})
export class SelectionView {
  public selectedDatePlans: string[] = ['Do Chores before Church on Sunday', 'Complete Homework', 'Practice Music', 'Complete Homework', 'Practice Music', 'Complete Homework', 'Practice Music'];
  public plan: string = '';

  constructor(
    private calendarService: CalendarService
  ) {
  }

  onClear(): void {
    this.plan = '';
  }

  onSubmit(formData: NgForm): void {
    formData.reset();
    this.calendarService.setHasSelectedDate(false);
    console.log("onSubmit pressed");
  }
}
