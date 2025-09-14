import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-welcome-message',
  imports: [FontAwesomeModule],
  templateUrl: './welcome-message.html',
  styleUrl: './welcome-message.css'
})
export class WelcomeMessage {
  public isVisible = signal<boolean>(true);
  public faGithub = faGithub;
  @Output() isWelcomeMessageVisible = new EventEmitter<boolean>();

  ngOnInit(): void {
    const seen = localStorage.getItem('welcomeSeen');
    this.isVisible.set(!seen);
    if (seen) {
      this.isWelcomeMessageVisible.emit(false);
    }
  }

  onClose(): void {
    localStorage.setItem('welcomeSeen', 'true');
    this.isVisible.set(false);
    this.isWelcomeMessageVisible.emit(false);
  }
}
