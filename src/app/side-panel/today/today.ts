import { Component, computed } from '@angular/core';
import { LocalStorageService, Plan } from '../../services/local-storage-service';
import { CalendarService } from '../../services/calendar-service';

@Component({
  selector: 'app-today',
  imports: [],
  templateUrl: './today.html',
  styleUrl: './today.css'
})
export class Today {
  public todaysPlan = computed(() => this.updateTodaysPlan());

  constructor(
    private localStorageService: LocalStorageService,
    private calendarService: CalendarService
  ) {}

  get todaysPlanButtonText(): string {
    const plans = this.todaysPlan();
    return plans.length <= 5 ? "Add plan for today" : `View ${plans.length - 5} more`;
  }

  updateTodaysPlan(): Plan[] {
    const day = this.calendarService.getCurrentDateDay();
    const month = this.calendarService.currentMonthIndex();
    const year = 2025;

    const block = this.localStorageService.blocks().find(
      block => block.date === day && block.month === month && block.year === year
    );

    return block ? [...block.plans] : [];
  }

  toggleViewToday(): void {
    this.calendarService.setHasSelectedDate(true);
    const day = this.calendarService.getCurrentDateDay();
    const month = this.calendarService.getCurrentDateMonth();

    this.calendarService.setSelectedMonth(month);
    this.calendarService.setSelectedDate(day);
  }
}
