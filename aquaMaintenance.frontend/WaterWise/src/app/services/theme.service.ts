import { Injectable, signal } from '@angular/core';

export type ThemeOption = 'light' | 'dark' | 'aqua';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private storageKey = 'waterwise-theme';
  private defaultTheme: ThemeOption = 'light';
  public currentTheme = signal<ThemeOption>(this.defaultTheme);

  constructor() {
    this.loadSavedTheme();
  }

  private loadSavedTheme(): void {
    const savedTheme = localStorage.getItem(this.storageKey) as ThemeOption;
    if (savedTheme && ['light', 'dark', 'aqua'].includes(savedTheme)) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme(this.defaultTheme);
    }
  }

  public setTheme(theme: ThemeOption): void {
    this.currentTheme.set(theme);
    localStorage.setItem(this.storageKey, theme);
    document.body.classList.remove('light-theme', 'dark-theme', 'aqua-theme');
  
    document.body.classList.add(`${theme}-theme`);
  }

  public toggleTheme(): void {
    const current = this.currentTheme();
    if (current === 'light') {
      this.setTheme('dark');
    } else if (current === 'dark') {
      this.setTheme('aqua');
    } else {
      this.setTheme('light');
    }
  }
}