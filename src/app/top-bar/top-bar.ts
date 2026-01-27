import { Component } from '@angular/core'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { CalendarService } from '../services/calendar-service';
import { SettingsService } from '../services/settings-service';

@Component({
  selector: 'app-top-bar',
  imports: [FontAwesomeModule],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css'
})
export class TopBar {
  public faUser = faUser;
  public faInfo = faInfoCircle;
  public currentDate: Date;

  constructor(
    private calendarService: CalendarService,
    private settingsService: SettingsService
  ) {
    this.currentDate = this.calendarService.getCurrentDate();
  }

  onInfoClick(): void {
    console.log(this.settingsService.isWelcomeMessage());
    this.settingsService.setIsWelcomeMessage(true);
  }
}
