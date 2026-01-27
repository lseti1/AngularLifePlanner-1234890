import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { SettingsService } from '../services/settings-service';

@Component({
  selector: 'app-welcome-message',
  imports: [FontAwesomeModule],
  templateUrl: './welcome-message.html',
  styleUrl: './welcome-message.css'
})
export class WelcomeMessage {
  public faGithub = faGithub;

  constructor (
    private settingsService: SettingsService
  ) {}

  onClose(): void {
    this.settingsService.setIsWelcomeMessage(false);
  }
}
