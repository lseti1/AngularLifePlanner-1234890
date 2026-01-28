import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBarsProgress, faGear, faUser } from '@fortawesome/free-solid-svg-icons';
import { SettingsService } from '../../services/settings-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  imports: [FontAwesomeModule, NgClass],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {
  public faGear = faGear;
  public faUser = faUser;
  public faSidebar = faBarsProgress;
  isSidebar = input<boolean>(false);

  constructor(
    private settingsService: SettingsService
  ) {}

  onSettings(): void {
    this.settingsService.setIsSettings(true);
  }

  onSidebar(): void {
    let isSidebar = this.settingsService.isSidebar();
    this.settingsService.setIsSidebar(!isSidebar);
  }
}
