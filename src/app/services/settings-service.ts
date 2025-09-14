import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public isSettings = signal<boolean>(false);

  setIsSettings(value: boolean): void {
    this.isSettings.set(value);
  }
}
