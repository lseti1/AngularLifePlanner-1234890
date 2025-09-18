import { CommonModule } from '@angular/common';
import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CalendarService } from '../../services/calendar-service';
import { OrdinalPipePipe } from '../../pipes/ordinal-pipe-pipe';
import { LocalStorageService, Plan } from '../../services/local-storage-service';

@Component({
  selector: 'app-selection-plan-view',
  imports: [FormsModule, CommonModule, OrdinalPipePipe],
  templateUrl: './selection-plan-view.html',
  styleUrl: './selection-plan-view.css'
})
export class SelectionPlanView implements OnInit {
  @Input() months: string[] = [];
  public dateBlocks = computed(() => this.localStorageService.blocks());
  public isEditing = signal<boolean>(false);
  public editPlanButtonText = computed(() => this.isEditing() ? "Finish Editing" : "Edit Plan");
  public plan: string = '' ;
  public description: string = '';
  public selectedMonthFirstDayIndex;

  constructor(
    private calendarService: CalendarService,
    private localStorageService: LocalStorageService
  ) {
    this.selectedMonthFirstDayIndex = this.calendarService.getSelectedMonthStartDate(this.calendarService.selectedMonthIndex());
  }

  ngOnInit() {
    let savedPlan = this.selectedPlanDetails;
    this.plan = savedPlan.title; 
    this.description = savedPlan.description;
  }

  get selectedDateIndex(): number {
    return this.calendarService.selectedDateIndex();
  }

  get selectedMonthIndex(): number {
    return this.calendarService.selectedMonthIndex();
  }

  get selectedPlanIndex(): string {
    return this.calendarService.selectedPlanIndex();
  }

  get selectedPlanDetails(): { title: string; description: string } {
    const selectDateBlock = this.dateBlocks().find(block => block.month === this.selectedMonthIndex && block.date === this.selectedDateIndex);
    return {
      title: selectDateBlock?.plans.find(plan => plan.id === this.selectedPlanIndex)?.title ?? '',
      description: selectDateBlock?.plans.find(plan => plan.id === this.selectedPlanIndex)?.description ?? ''
    };
  }

  onSubmit(planData: NgForm): void {
    this.calendarService.setHasSelectedPlan(false);
    this.localStorageService.editPlan(this.selectedPlanIndex, this.selectedDateIndex, this.selectedMonthIndex, this.description, this.plan);
  }

  onEditPlan(): void {
    this.isEditing.set(!this.isEditing());
  }

  onReturn(): void {
    this.calendarService.setHasSelectedPlan(false);
  }
}
