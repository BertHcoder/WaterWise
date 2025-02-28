import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WaterParametersService } from '../../services/water-parameters.service';

@Component({
  selector: 'app-parameter-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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