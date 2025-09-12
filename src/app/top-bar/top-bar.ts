import { DatePipe } from '@angular/common';
import { Component } from '@angular/core'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CalendarService } from '../services/calendar-service';

@Component({
  selector: 'app-top-bar',
  imports: [DatePipe, FontAwesomeModule],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css'
})
export class TopBar {
  public faUser = faUser;
  public currentDate: Date;

  constructor(
    private calendarService: CalendarService
  ) {
    this.currentDate = this.calendarService.getCurrentDate();
  }
}
