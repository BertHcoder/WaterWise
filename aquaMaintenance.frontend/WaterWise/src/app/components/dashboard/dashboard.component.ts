import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParameterFormComponent } from '../parameter-form/parameter-form.component';
import { ParameterHistoryComponent } from '../parameter-history/parameter-history.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ParameterFormComponent, ParameterHistoryComponent ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  activeTab: 'form' | 'history' = 'form';
}