import { CommonModule } from '@angular/common';
import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CalendarService } from '../../services/calendar-service';
import { OrdinalPipePipe } from '../../pipes/ordinal-pipe-pipe';
import { LocalStorageService } from '../../services/local-storage-service';

export type selectionViewType = 'viewing' | 'adding' | 'editing';

@Component({
  selector: 'app-selection-view',
  imports: [FormsModule, CommonModule, OrdinalPipePipe],
  templateUrl: './selection-view.html',
  styleUrl: './selection-view.css'
})
export class SelectionView implements OnInit {
  @Input() months: string[] = [];
  @Input() selectedMonthFirstDayIndex: number = 0;

  public selectedDatePlans = signal<string[]>([]);
  public plan: string = '';

  public selectionViewType = signal<selectionViewType>('viewing');
  public AddPlansText = computed(() => this.selectionViewType() !== 'adding' ? 'Add Plans' : 'Finish Adding');
  public dateBlocks = computed(() => this.localStorageService.blocks());

  constructor(
    private calendarService: CalendarService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
      this.updateSelectedDatePlans();
  }

  get selectedDateIndex(): number {
    return this.calendarService.selectedDateIndex() - this.selectedMonthFirstDayIndex + 1;
  }

  get selectedMonthIndex(): number {
    return this.calendarService.selectedMonthIndex();
  }

  updateSelectedDatePlans(): void {
    const day = this.calendarService.selectedDateIndex();
    const month = this.calendarService.selectedMonthIndex();
    const year = 2025;

    const block = this.localStorageService.blocks().find(
      block => block.date === day && block.month === month && block.year === year
    );

    this.selectedDatePlans.set(block ? block.plans.map(plan => plan.title) : []);
  }

  onClear(): void {
    this.plan = '';
  }

  onSubmit(formData: NgForm): void {
    formData.reset();
    this.calendarService.setHasSelectedDate(false);
  }

  onAddPlan(date: number, month: number, plan: string): void {
    this.localStorageService.addPlan(date, month, plan, false);
    this.plan = '';
    this.updateSelectedDatePlans();
  }

  toggleSelectionView(viewType: selectionViewType): void {
    this.selectionViewType.set(
      this.selectionViewType() === viewType ? 'viewing' : viewType
    );
  }
}
