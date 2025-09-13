import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CalendarService } from '../../services/calendar-service';
import { OrdinalPipePipe } from '../../pipes/ordinal-pipe-pipe';

export type selectionViewType = 'viewing' | 'adding' | 'editing';

@Component({
  selector: 'app-selection-view',
  imports: [FormsModule, CommonModule, OrdinalPipePipe],
  templateUrl: './selection-view.html',
  styleUrl: './selection-view.css'
})
export class SelectionView {
  @Input() months: string[] = [];
  @Input() selectedMonthFirstDayIndex: number = 0;

  public selectedDatePlans: string[] = ['Do Chores before Church on Sunday', 'Complete Homework', 'Practice Music', 'Complete Homework', 'Practice Music', 'Complete Homework', 'Practice Music'];
  public plan: string = '';

  public selectionViewType = signal<selectionViewType>('viewing');
  public AddPlansText = computed(() => this.selectionViewType() !== 'adding' ? 'Add Plans' : 'Finish Adding');

  constructor(
    private calendarService: CalendarService
  ) {
  }

  get selectedDateIndex(): number {
    return this.calendarService.selectedDateIndex() - this.selectedMonthFirstDayIndex + 1;
  }

  get selectedMonthIndex(): string {
    return this.months[this.calendarService.selectedMonthIndex()];
  }

  onClear(): void {
    this.plan = '';
  }

  onSubmit(formData: NgForm): void {
    formData.reset();
    this.calendarService.setHasSelectedDate(false);
    console.log("onSubmit pressed");
  }

  onAddPlan(): void {
    this.plan = '';
  }

  toggleSelectionView(viewType: selectionViewType): void {
    this.selectionViewType.set(
      this.selectionViewType() === viewType ? 'viewing' : viewType
    );
  }

  
}
