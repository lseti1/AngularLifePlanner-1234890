import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public isSettings = signal<boolean>(false);
  public isWelcomeMessage = signal<boolean>(false);
  public isSidebar = signal<boolean>(true);

  setIsSettings(value: boolean): void {
    this.isSettings.set(value);
  }

  setIsWelcomeMessage(value: boolean): void {
    this.isWelcomeMessage.set(value);
  }

  setIsSidebar(value: boolean): void {
    this.isSidebar.set(value);
  }
}
