import { Component, computed } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage-service';
import { OrdinalPipePipe } from "../../pipes/ordinal-pipe-pipe";
import { CalendarService } from '../../services/calendar-service';

@Component({
  selector: 'app-filtered-plans',
  imports: [OrdinalPipePipe],
  templateUrl: './filtered-plans.html',
  styleUrl: './filtered-plans.css'
})
export class FilteredPlans {
  // Fow now, this FilteredPLans sections will just display all future plans that are yet to be completed
  public months: string[] = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  public dateBlocks = computed(() => {
    const today = new Date();
    const cutoff = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);

    return this.localStorageService.blocks()
      .filter(block => new Date(block.year, block.month, block.date) >= cutoff)
      .sort((a, b) => {
        const aDate = new Date(a.year, a.month, a.date).getTime();
        const bDate = new Date(b.year, b.month, b.date).getTime();
        return aDate - bDate;
      });
  });
  
  constructor(
    private localStorageService: LocalStorageService,
    private calendarService: CalendarService
  ) {}

  onViewPlan(month: number, date: number): void {
    this.calendarService.setHasSelectedDate(true);
    this.calendarService.setSelectedDate(date);
    this.calendarService.setSelectedMonth(month);
  }
}
