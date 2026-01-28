import { Component, computed } from '@angular/core';
import { Today } from './today/today';
import { Tomorrow } from './tomorrow/tomorrow';
import { SearchBar } from './search-bar/search-bar';
import { FilteredPlans } from './filtered-plans/filtered-plans';
import { LocalStorageService } from '../services/local-storage-service';
import { SettingsService } from '../services/settings-service';

@Component({
  selector: 'app-side-panel',
  imports: [Today, Tomorrow, SearchBar, FilteredPlans],
  templateUrl: './side-panel.html',
  styleUrl: './side-panel.css'
})
export class SidePanel {
  public isSidebar = computed(() => this.settingsService.isSidebar()); 

  constructor(
    private settingsService: SettingsService
  ) {}


}
