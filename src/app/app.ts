import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from './top-bar/top-bar';
import { SidePanel } from './side-panel/side-panel';
import { CalendarView } from './calendar-view/calendar-view';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WelcomeMessage } from './welcome-message/welcome-message';
import { Settings } from './settings/settings';
import { SettingsService } from './services/settings-service';

export const YEAR = new Date().getFullYear();

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBar, SidePanel, CalendarView, FontAwesomeModule, WelcomeMessage, Settings],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lifePlanner');
  public isWelcomeMessage = computed(() => this.settingsService.isWelcomeMessage());
  public isSettings = computed(() => this.settingsService.isSettings());
  public isSidebar = computed(() => this.settingsService.isSidebar());

  constructor(
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    const seen = localStorage.getItem('welcomeSeen');
    if (seen) {
      this.settingsService.setIsWelcomeMessage(false);
    } else {
      this.settingsService.setIsWelcomeMessage(true);
      localStorage.setItem('welcomeSeen', 'true');
    }
  }
}
