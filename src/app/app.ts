import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from './top-bar/top-bar';
import { SidePanel } from './side-panel/side-panel';
import { CalendarView } from './calendar-view/calendar-view';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBar, SidePanel, CalendarView],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lifePlanner');

}
