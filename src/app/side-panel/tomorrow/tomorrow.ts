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

  updateTomorrowsPlan(): Plan[] {
    const day = this.calendarService.getCurrentDateDay() + 1;
    const month = this.calendarService.currentMonthIndex();
    const year = 2025;

    const block = this.localStorageService.blocks().find(
      block => block.date === day && block.month === month && block.year === year
    );

    return block ? [...block.plans] : [];
  }
}
