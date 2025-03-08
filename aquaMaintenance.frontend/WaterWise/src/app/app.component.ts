import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);

  title = 'Water Parameters Tracker';

  ngOnInit(): void {
    // Initialize theme on app start
    const currentTheme = this.themeService.currentTheme();
    this.themeService.setTheme(currentTheme);
  }
}