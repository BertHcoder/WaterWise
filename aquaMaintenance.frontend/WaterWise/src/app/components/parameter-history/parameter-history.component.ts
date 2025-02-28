import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterParametersService } from '../../services/water-parameters.service';
import { WaterParameters } from '../../models/water-parameters.model';

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
}