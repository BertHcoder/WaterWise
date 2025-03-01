import { Component } from '@angular/core';
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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

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
  styleUrls: ['./parameter-form.component.scss']
})
export class ParameterFormComponent {
  parameterForm: FormGroup;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private waterParametersService: WaterParametersService
  ) {
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

  onSubmit(): void {
    if (this.parameterForm.valid) {
      this.waterParametersService.addParameters(this.parameterForm.value);
      this.successMessage = 'Water parameters saved successfully!';
      
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

      // Clear success message after 3 seconds
      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
    }
  }
}