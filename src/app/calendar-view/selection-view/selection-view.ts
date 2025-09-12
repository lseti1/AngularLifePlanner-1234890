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
  public selectedPlanText: string = '';

  constructor(
    private calendarService: CalendarService
  ) {
  }

  onClear(): void {
    this.selectedPlanText = '';
  }

  onSubmit(formData: NgForm): void {
    formData.reset();
    this.calendarService.setHasSelectedDate(false);
    console.log("onSubmit pressed");
  }
}
