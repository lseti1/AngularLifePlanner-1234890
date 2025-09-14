import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from './top-bar/top-bar';
import { SidePanel } from './side-panel/side-panel';
import { CalendarView } from './calendar-view/calendar-view';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WelcomeMessage } from './welcome-message/welcome-message';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBar, SidePanel, CalendarView, FontAwesomeModule, WelcomeMessage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lifePlanner');
  public isWelcomeMessage: boolean = true;

  setIsWelcomeMessage(value: boolean): void {
    this.isWelcomeMessage = value;
  }
}
