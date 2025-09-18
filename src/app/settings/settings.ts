import { Component, EventEmitter, Output, signal } from '@angular/core';
import { SettingsService } from '../services/settings-service';
import { LocalStorageService } from '../services/local-storage-service';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {
  public isVisible = signal<boolean>(true);
  public clearAllButtonText = signal<string>("Clear ALL Plans & Data")
  public clearPastButtonText = signal<string>("Clear PAST Plans")

  constructor(
    private settingsService: SettingsService,
    private localStorageService: LocalStorageService
  ) {}

  onClearAllData(): void {
    this.clearAllButtonText.set("Clearing...");

    setTimeout(() => {
      this.localStorageService.clearAppData();
      this.settingsService.setIsSettings(false);
    }, 2000);
  }

  onClearPastData(): void {
    this.clearPastButtonText.set("Clearing...");

    setTimeout(() => {
      this.localStorageService.clearPastAppData();
      this.settingsService.setIsSettings(false);
    }, 2000);
  }

  onClose(): void {
    this.settingsService.setIsSettings(false);
  }
}
