import { Component, computed } from '@angular/core';
import { LocalStorageService, Plan } from '../../services/local-storage-service';
import { CalendarService } from '../../services/calendar-service'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle as faCheckCircleRegular } from '@fortawesome/free-regular-svg-icons';
import { DatePipe } from '@angular/common';
import { OrdinalPipePipe } from '../../pipes/ordinal-pipe-pipe';
import { YEAR } from '../../app';

@Component({
  selector: 'app-today',
  imports: [FontAwesomeModule, DatePipe, OrdinalPipePipe],
  templateUrl: './today.html',
  styleUrl: './today.css'
})
export class Today {
  public faCheckCircle = faCheckCircle;
  public faCheckCircleRegular = faCheckCircleRegular;
  public todaysPlan = computed(() => this.updateTodaysPlan());
  public currentDate: Date;

  constructor(
    private localStorageService: LocalStorageService,
    private calendarService: CalendarService
  ) {
    this.currentDate = this.calendarService.getCurrentDate();
  }

  get todaysPlanButtonText(): string {
    const plans = this.todaysPlan();
    return plans.length <= 5 ? "Add plan for today" : `View ${plans.length - 5} more`;
  }

  updateTodaysPlan(): Plan[] {
    const day = this.calendarService.getCurrentDateDay();
    const month = this.calendarService.currentMonthIndex();

    const block = this.localStorageService.blocks().find(
      block => block.date === day && block.month === month && block.year === YEAR
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
