import { Component, computed } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage-service';
import { OrdinalPipePipe } from "../../pipes/ordinal-pipe-pipe";

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

    return this.localStorageService.blocks()
      .filter(block => new Date(block.year, block.month, block.date) >= today)
      .sort((a, b) => {
        const aDate = new Date(a.year, a.month, a.date).getTime();
        const bDate = new Date(b.year, b.month, b.date).getTime();
        return aDate - bDate;
      });
  });
  
  constructor(
    private localStorageService: LocalStorageService
  ) {}

  
}
