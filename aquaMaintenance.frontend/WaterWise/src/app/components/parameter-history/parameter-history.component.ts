import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterParametersService } from '../../services/water-parameters.service';
import { WaterParameters } from '../../models/water-parameters.model';
import { getParameterStatus } from '../../models/parameter-ranges.model';

@Component({
  selector: 'app-parameter-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parameter-history.component.html',
  styleUrls: ['./parameter-history.component.scss']
})
export class ParameterHistoryComponent implements OnInit {
  parameters: WaterParameters[] = [];

  constructor(private waterParametersService: WaterParametersService) {}

  ngOnInit(): void {
    this.waterParametersService.getAllParameters().subscribe(data => {
      this.parameters = data.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    });
  }

  deleteParameter(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.waterParametersService.deleteParameters(id);
    }
  }

  getHealthScoreClass(score: number | undefined): string {
    if (score === undefined) return '';
    
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 50) return 'caution';
    if (score >= 25) return 'poor';
    return 'critical';
  }

  getParameterStatusClass(parameter: string, value: number): string {
    if (!value) return 'badge-unknown';
    
    const status = getParameterStatus(parameter, value);
    
    switch (status) {
      case 'good':
        return 'badge-good';
      case 'borderline-low':
      case 'borderline-high':
        return 'badge-borderline';
      case 'below-range':
      case 'above-range':
        return 'badge-danger';
      default:
        return 'badge-unknown';
    }
  }

  getParameterStatusLabel(parameter: string, value: number): string {
    if (!value) return 'N/A';
    
    const status = getParameterStatus(parameter, value);
    
    switch (status) {
      case 'good':
        return 'Good';
      case 'borderline-low':
        return 'Low';
      case 'borderline-high':
        return 'High';
      case 'below-range':
        return 'Too Low';
      case 'above-range':
        return 'Too High';
      default:
        return 'N/A';
    }
  }
}