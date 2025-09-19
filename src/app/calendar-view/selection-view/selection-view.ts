import { CommonModule } from '@angular/common';
import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CalendarService } from '../../services/calendar-service';
import { OrdinalPipePipe } from '../../pipes/ordinal-pipe-pipe';
import { LocalStorageService } from '../../services/local-storage-service';
import { Plan } from '../../services/local-storage-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle as faCheckCircleRegular } from '@fortawesome/free-regular-svg-icons';

export type selectionViewType = 'viewing' | 'adding' | 'editing';

@Component({
  selector: 'app-selection-view',
  imports: [FormsModule, CommonModule, OrdinalPipePipe, FontAwesomeModule],
  templateUrl: './selection-view.html',
  styleUrl: './selection-view.css'
})
export class SelectionView {
  @Input() months: string[] = [];

  public selectedMonthFirstDayIndex;
  public faCheckCircle = faCheckCircle;
  public faCheckCircleRegular = faCheckCircleRegular;
  public selectedDatePlans = computed(() => this.updateSelectedDatePlans());
  public plan: string = '';
  public selectionViewType = signal<selectionViewType>('viewing');
  public AddPlansText = computed(() => this.selectionViewType() !== 'adding' ? 'Add Plans' : 'Finish Adding');
  public dateBlocks = computed(() => this.localStorageService.blocks());
  public todaysDate = computed(() => this.calendarService.currentDate);
  public currentPlanIndex: number = 0;

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
    const year = 2025;

    const block = this.localStorageService.blocks().find(
      block => block.date === day && block.month === month && block.year === year
    );

    return block ? [...block.plans] : [];
  }

  onClear(): void {
    this.plan = '';
  }

  onSubmit(formData: NgForm): void {
    formData.reset();
    this.calendarService.setHasSelectedDate(false);
  }

  onAddPlan(date: number, month: number, plan: string): void {
    console.log("From Inside on AddPlan, this.selectedMonthFirstDayIndex = ", this.selectedMonthFirstDayIndex);
    console.log("From Inside on AddPlan, Pass date variable = ", date);
    this.localStorageService.addPlan(date, month, plan, '', false);
    this.plan = '';
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

  isPastMonthDay(day: number): boolean { 
    const isPastMonth = this.selectedMonthIndex < this.calendarService.currentMonthIndex();
    const isPastDay = day < this.calendarService.currentDate.getDate() && this.selectedMonthIndex <= this.calendarService.currentMonthIndex();
    return isPastMonth || isPastDay;
  }
}
