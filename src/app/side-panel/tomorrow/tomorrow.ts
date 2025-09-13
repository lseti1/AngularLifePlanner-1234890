import { Component, computed } from '@angular/core';
import { LocalStorageService, Plan } from '../../services/local-storage-service';
import { CalendarService } from '../../services/calendar-service';

@Component({
  selector: 'app-tomorrow',
  imports: [],
  templateUrl: './tomorrow.html',
  styleUrl: './tomorrow.css'
})
export class Tomorrow {
  public tomorrowsPlan = computed(() => this.updateTomorrowsPlan());

  constructor(
    private localStorageService: LocalStorageService,
    private calendarService: CalendarService
  ) {}

  get tomorrowsPlanButtonText(): string {
    const plans = this.tomorrowsPlan();
    return plans.length <= 5 ? "Add plan for tomorrow" : `View ${plans.length - 5} more`;
  }

  updateTomorrowsPlan(): Plan[] {
    const day = this.calendarService.getCurrentDateDay() + 1;
    const month = this.calendarService.currentMonthIndex();
    const year = 2025;

    const block = this.localStorageService.blocks().find(
      block => block.date === day && block.month === month && block.year === year
    );

    return block ? [...block.plans] : [];
  }

  toggleViewTomorrow(): void {
    this.calendarService.setHasSelectedDate(true);
    const day = this.calendarService.getCurrentDateDay() + 1;
    const month = this.calendarService.getCurrentDateMonth();

    this.calendarService.setSelectedMonth(month);
    this.calendarService.setSelectedDate(day);
  }
}
