import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CalendarService } from '../../services/calendar-service';

export type selectionViewType = 'viewing' | 'adding' | 'editing';

@Component({
  selector: 'app-selection-view',
  imports: [FormsModule, CommonModule],
  templateUrl: './selection-view.html',
  styleUrl: './selection-view.css'
})
export class SelectionView {
  public selectedDatePlans: string[] = ['Do Chores before Church on Sunday', 'Complete Homework', 'Practice Music', 'Complete Homework', 'Practice Music', 'Complete Homework', 'Practice Music'];
  public plan: string = '';

  public selectionViewType = signal<selectionViewType>('viewing');
  public AddPlansText = computed(() => this.selectionViewType() !== 'adding' ? 'Add Plans' : 'Finish Adding');

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

  onAddPlan(): void {
    this.plan = '';
  }

  toggleSelectionView(viewType: selectionViewType): void {
    this.selectionViewType.set(
      this.selectionViewType() === viewType ? 'viewing' : viewType
    );
  }
}
