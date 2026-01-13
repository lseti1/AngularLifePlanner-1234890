import { Component, computed } from '@angular/core';
import { LocalStorageService, Plan } from '../../services/local-storage-service';
import { CalendarService } from '../../services/calendar-service';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faCheckCircle as faCheckCircleRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatePipe } from '@angular/common';
import { OrdinalPipePipe } from '../../pipes/ordinal-pipe-pipe';
import { YEAR } from '../../app';

@Component({
  selector: 'app-tomorrow',
  imports: [FontAwesomeModule, DatePipe, OrdinalPipePipe],
  templateUrl: './tomorrow.html',
  styleUrl: './tomorrow.css'
})
export class Tomorrow {
  public tomorrowsPlan = computed(() => this.updateTomorrowsPlan());
  public faCheckCircle = faCheckCircle;
  public faCheckCircleRegular = faCheckCircleRegular;
  public faCalendarRegular = faCalendar;
  public tomorrowDate: Date;

  constructor(
    private localStorageService: LocalStorageService,
    private calendarService: CalendarService
  ) {
    const today = this.calendarService.getCurrentDate();
    this.tomorrowDate = new Date(today);
    this.tomorrowDate.setDate(today.getDate() + 1);
  }

  get tomorrowsPlanButtonText(): string {
    const plans = this.tomorrowsPlan();
    return plans.length <= 5 ? "Add Plan" : `View all`;
  }

  updateTomorrowsPlan(): Plan[] {
    const day = this.calendarService.getCurrentDateDay() + 1;
    const month = this.calendarService.currentMonthIndex();

    const block = this.localStorageService.blocks().find(
      block => block.date === day && block.month === month && block.year === YEAR
    );

    return block ? [...block.plans] : [];
  }

  toggleViewTomorrow(): void {
    const day = this.calendarService.getCurrentDateDay() + 1;
    const month = this.calendarService.getCurrentDateMonth();

    this.calendarService.setSelectedMonth(month);
    this.calendarService.setSelectedDate(day);
    this.calendarService.setHasSelectedDate(true);
  }
}
