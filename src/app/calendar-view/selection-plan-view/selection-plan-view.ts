import { CommonModule } from '@angular/common';
import { Component, computed, input, Input, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CalendarService } from '../../services/calendar-service';
import { OrdinalPipePipe } from '../../pipes/ordinal-pipe-pipe';
import { LocalStorageService, Plan, PlanType } from '../../services/local-storage-service';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faBookmark, faList } from '@fortawesome/free-solid-svg-icons';
import { TYPE_COLOR_MAP } from '../selection-view/selection-view';

@Component({
  selector: 'app-selection-plan-view',
  imports: [FormsModule, CommonModule, OrdinalPipePipe, FaIconComponent],
  templateUrl: './selection-plan-view.html',
  styleUrl: './selection-plan-view.css'
})
export class SelectionPlanView implements OnInit {
  months = input<string[]>([]);
  public dateBlocks = computed(() => this.localStorageService.blocks());
  public isEditing = signal<boolean>(false);
  public editPlanButtonText = computed(() => this.isEditing() ? "Finish Editing" : "Edit Plan");
  public planTitle: string = '' ;
  public planDescription: string = '';
  public planType: PlanType = 'Plan';
  public selectedMonthFirstDayIndex;
  public faCalendar = faCalendar;
  public faDescription = faList;
  public faBookmark = faBookmark;
  public faOptions = faList;
  public colorMap = TYPE_COLOR_MAP;

  public readonly planTypeOptions: PlanType[] = ['Plan', 'Work', 'Personal', 'Event'];

  constructor(
    private calendarService: CalendarService,
    private localStorageService: LocalStorageService
  ) {
    this.selectedMonthFirstDayIndex = this.calendarService.getSelectedMonthStartDate(this.calendarService.selectedMonthIndex());
  }

  ngOnInit() {
    let savedPlan = this.selectedPlanDetails;
    this.planTitle = savedPlan.title; 
    this.planDescription = savedPlan.description;
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
    this.localStorageService.editPlan(this.selectedPlanIndex, this.selectedDateIndex, this.selectedMonthIndex, this.planDescription, this.planTitle);
  }

  onEditPlan(): void {
    this.isEditing.set(!this.isEditing());
  }

  onReturn(): void {
    this.calendarService.setHasSelectedPlan(false);
  }
}
