export interface WaterParameter {
  id: number;
  date: string;
  ph: number;
  temperature: number;
  ammonia: number;
  nitrite: number;
  nitrate: number;
  phosphate: number;
  kh: number;
  gh: number;
  notes: string;
  healthScore?: number;
}

export interface ParameterStatus {
  value: number;
  status: 'good' | 'borderline-low' | 'borderline-high' | 'below-range' | 'above-range' | 'unknown';
}

export interface ParameterFeedback {
  ph: ParameterStatus;
  ammonia: ParameterStatus;
  nitrite: ParameterStatus;
  nitrate: ParameterStatus;
  gh: ParameterStatus;
  kh: ParameterStatus;
  healthScore: number;
  overallStatus: 'excellent' | 'good' | 'caution' | 'poor' | 'critical';
}