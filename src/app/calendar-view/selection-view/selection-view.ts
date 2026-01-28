import { CommonModule } from '@angular/common';
import { Component, computed, input, Input, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CalendarService } from '../../services/calendar-service';
import { OrdinalPipePipe } from '../../pipes/ordinal-pipe-pipe';
import { DateBlock, LocalStorageService, PlanColor, PlanType } from '../../services/local-storage-service';
import { Plan } from '../../services/local-storage-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookmark, faCalendarTimes, faCheckCircle, faCircleXmark, } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faCalendarPlus, faCheckCircle as faCheckCircleRegular } from '@fortawesome/free-regular-svg-icons';
import { YEAR } from '../../app';

export type selectionViewType = 'viewing' | 'adding' | 'editing';
export const TYPE_COLOR_MAP: Record<PlanType, PlanColor> = {
  'Plan': '#95a5a6',    
  'Work': '#2ecc71',     
  'Personal': '#3498db', 
  'Event': '#e67e22'     
};

@Component({
  selector: 'app-selection-view',
  imports: [FormsModule, CommonModule, OrdinalPipePipe, FontAwesomeModule],
  templateUrl: './selection-view.html',
  styleUrl: './selection-view.css'
})
export class SelectionView {
  months = input<string[]>([]);

  public selectedMonthFirstDayIndex;
  public faCheckCircle = faCheckCircle;
  public faCheckCircleRegular = faCheckCircleRegular;
  public faCalendarAdd = faCalendarPlus;
  public faCalendarFinished = faCalendarTimes;
  public faCalendarAlt = faCalendarAlt;
  public faDelete = faCircleXmark;
  public faBookmark = faBookmark;
  public selectedDatePlans = computed(() => this.updateSelectedDatePlans());
  public planTitle: string = '';
  public planDescription: string = '';
  public planType: PlanType = "Plan";
  public selectionViewType = signal<selectionViewType>('viewing');
  public AddPlansText = computed(() => this.selectionViewType() !== 'adding' ? 'Add Plans' : 'Finish Adding');
  public dateBlocks = computed(() => this.localStorageService.blocks());
  public todaysDate = computed(() => this.calendarService.currentDate);
  public validSelectedPlan = computed(() => this.isPastMonthDay());
  public currentPlanIndex: number = 0;

  public readonly planTypeOptions: PlanType[] = ['Plan', 'Work', 'Personal', 'Event'];

  constructor(
    private calendarService: CalendarService,
    private localStorageService: LocalStorageService
  ) {
    this.selectedMonthFirstDayIndex = this.calendarService.getSelectedMonthStartDate(this.calendarService.selectedMonthIndex());
    
  }

  get selectedDateIndex(): number {
    return this.calendarService.selectedDateIndex();
  }

  get selectedMonthIndex(): number {
    return this.calendarService.selectedMonthIndex();
  }

  updateSelectedDatePlans(): Plan[] {
    const day = this.calendarService.selectedDateIndex();
    const month = this.calendarService.selectedMonthIndex();

    const block = this.localStorageService.blocks().find(
      block => block.date === day && block.month === month && block.year === YEAR
    );

    return block ? [...block.plans] : [];
  }

  onClear(): void {
    this.planTitle = '';
    this.planDescription ='';
    this.planType = 'Plan';
  }

  onSubmit(formData: NgForm): void {
    formData.reset();
    this.calendarService.setHasSelectedDate(false);
  }

  onAddPlan(date: number, month: number, plan: string, description: string, type: PlanType): void {
    const planInfo: Plan = {
      id: crypto.randomUUID(),
      title: plan,
      type: type ?? 'Plan',
      description: description ?? '', 
      time: 'Example Time',
      color: TYPE_COLOR_MAP[type],
      completed: false,
    };

    const dateInfo: DateBlock = {
      id: crypto.randomUUID(),
      date: date,
      month: month,
      year: 2025,
      plans: [],
    };

    this.localStorageService.addPlan(planInfo, dateInfo);
    this.onClear();
  }

  onMarkPlanComplete(ID: string, date: number, month: number, e: Event): void {
    e.stopPropagation()
    this.localStorageService.togglePlanComplete(ID, date, month);
  }

  onRemovePlan(ID: string, date: number, month: number, e: Event): void {
    e.stopPropagation();
    this.localStorageService.removePlan(ID, date, month);
  }

  toggleSelectionView(viewType: selectionViewType): void {
    this.selectionViewType.set(
      this.selectionViewType() === viewType ? 'viewing' : viewType
    );
  }

  onSelectPlan(ID: string): void {
    this.calendarService.setHasSelectedPlan(true);
    this.calendarService.setSelectedPlanIndex(ID);
  }

  isPastMonthDay(): boolean { 
    const isPastMonth = this.selectedMonthIndex < this.calendarService.currentMonthIndex();
    const isPastDay = this.selectedDateIndex < this.calendarService.currentDate.getDate() && this.selectedMonthIndex <= this.calendarService.currentMonthIndex();
    return isPastMonth || isPastDay;
  }
}
