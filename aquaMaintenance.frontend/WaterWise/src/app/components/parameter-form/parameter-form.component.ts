import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WaterParametersService } from '../../services/water-parameters.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ParameterFeedback } from '../../models/water-parameters.model';

@Component({
  selector: 'app-parameter-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,  MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
  MatSnackBarModule],
  templateUrl: './parameter-form.component.html',
  styleUrls: ['./parameter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParameterFormComponent {
  private fb = inject(FormBuilder);
  private waterParametersService = inject(WaterParametersService);
  private snackBar = inject(MatSnackBar);

  parameterForm: FormGroup;
  showFeedback = false;
  feedback!: ParameterFeedback;

  constructor() {
    this.parameterForm = this.fb.group({
      date: [new Date().toISOString().split('T')[0], Validators.required],
      ph: [7.0, [Validators.required, Validators.min(0), Validators.max(14)]],
      temperature: [25.0, [Validators.required, Validators.min(0), Validators.max(40)]],
      ammonia: [0, [Validators.min(0)]],
      nitrite: [0, [Validators.min(0)]],
      nitrate: [0, [Validators.min(0)]],
      phosphate: [0, [Validators.min(0)]],
      kh: [0, [Validators.min(0)]],
      gh: [0, [Validators.min(0)]],
      notes: ['']
    });
  }

  checkParameters(): void {
    if (this.parameterForm.valid) {
      const formValues = this.parameterForm.value;
      this.feedback = this.waterParametersService.getParameterFeedback({
        ph: formValues.ph,
        ammonia: formValues.ammonia,
        nitrite: formValues.nitrite,
        nitrate: formValues.nitrate,
        gh: formValues.gh,
        kh: formValues.kh
      });
      this.showFeedback = true;
    }
  }

  saveWithFeedback(): void {
    if (this.parameterForm.valid) {
      // Add health score to the form data
      const formData = {
        ...this.parameterForm.value,
        healthScore: this.feedback.healthScore
      };
      
      this.waterParametersService.addParameters(formData);
      
      this.snackBar.open('Water parameters saved successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      
      // Reset form with default values
      this.parameterForm.reset({
        date: new Date().toISOString().split('T')[0],
        ph: 7.0,
        temperature: 25.0,
        ammonia: 0,
        nitrite: 0,
        nitrate: 0,
        phosphate: 0,
        kh: 0,
        gh: 0,
        notes: ''
      });
      
      this.showFeedback = false;
    }
  }

  getHealthScoreClass(): string {
    if (!this.feedback) return '';
    
    if (this.feedback.healthScore >= 90) return 'excellent';
    if (this.feedback.healthScore >= 75) return 'good';
    if (this.feedback.healthScore >= 50) return 'caution';
    if (this.feedback.healthScore >= 25) return 'poor';
    return 'critical';
  }

  getStatusMessage(): string {
    if (!this.feedback) return '';
    
    switch (this.feedback.overallStatus) {
      case 'excellent':
        return 'Excellent for Neocaridina shrimp!';
      case 'good':
        return 'Good conditions for Neocaridina shrimp.';
      case 'caution':
        return 'Use caution - some parameters need attention.';
      case 'poor':
        return 'Poor conditions - not recommended for shrimp.';
      case 'critical':
        return 'Critical conditions - unsafe for shrimp!';
      default:
        return '';
    }
  }

  formatStatus(status: string): string {
    switch (status) {
      case 'good':
        return 'Good';
      case 'borderline-low':
        return 'Borderline Low';
      case 'borderline-high':
        return 'Borderline High';
      case 'below-range':
        return 'Below Range';
      case 'above-range':
        return 'Above Range';
      default:
        return 'Unknown';
    }
  }
}