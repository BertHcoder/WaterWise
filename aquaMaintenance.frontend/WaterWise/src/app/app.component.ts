import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ DashboardComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Water Parameters Tracker';
}