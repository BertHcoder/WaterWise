export interface ParameterRange {
  min: number;
  max: number;
  status: 'good' | 'borderline-low' | 'borderline-high' | 'below-range' | 'above-range';
}

export interface ParameterRanges {
  [key: string]: {
    [status: string]: ParameterRange;
  };
}

export const NEOCARIDINA_RANGES: ParameterRanges = {
  ph: {
    'good': { min: 6.8, max: 7.5, status: 'good' },
    'borderline-high': { min: 7.6, max: 8.0, status: 'borderline-high' },
    'borderline-low': { min: 6.4, max: 6.7, status: 'borderline-low' },
    'above-range': { min: 8.1, max: 14, status: 'above-range' },
    'below-range': { min: 0, max: 6.3, status: 'below-range' }
  },
  ammonia: {
    'good': { min: 0, max: 0, status: 'good' },
    'above-range': { min: 0.01, max: 100, status: 'above-range' }
  },
  nitrite: {
    'good': { min: 0, max: 0, status: 'good' },
    'above-range': { min: 0.01, max: 100, status: 'above-range' }
  },
  nitrate: {
    'good': { min: 0, max: 14, status: 'good' },
    'borderline-high': { min: 15, max: 20, status: 'borderline-high' },
    'above-range': { min: 21, max: 1000, status: 'above-range' }
  },
  gh: {
    'good': { min: 6, max: 10, status: 'good' },
    'borderline-high': { min: 11, max: 14, status: 'borderline-high' },
    'borderline-low': { min: 4, max: 5, status: 'borderline-low' },
    'above-range': { min: 15, max: 100, status: 'above-range' },
    'below-range': { min: 0, max: 3, status: 'below-range' }
  },
  kh: {
    'good': { min: 2, max: 8, status: 'good' },
    'borderline-high': { min: 9, max: 10, status: 'borderline-high' },
    'borderline-low': { min: 0, max: 1, status: 'borderline-low' },
    'above-range': { min: 11, max: 100, status: 'above-range' }
  }
};

export function getParameterStatus(parameter: string, value: number): string {
  if (!NEOCARIDINA_RANGES[parameter]) {
    return 'unknown';
  }

  for (const status in NEOCARIDINA_RANGES[parameter]) {
    const range = NEOCARIDINA_RANGES[parameter][status];
    if (value >= range.min && value <= range.max) {
      return range.status;
    }
  }

  return 'unknown';
}

export function calculateHealthScore(parameters: {
  ph?: number;
  ammonia?: number;
  nitrite?: number;
  nitrate?: number;
  gh?: number;
  kh?: number;
}): number {
  // Base score is 100
  let score = 100;
  let paramCount = 0;

  // Check each parameter and deduct points based on status
  for (const [param, value] of Object.entries(parameters)) {
    if (value === undefined || value === null || isNaN(value) || value <= 0) {
      continue;
    }

    paramCount++;
    const status = getParameterStatus(param, value);
    
    switch (status) {
      case 'good':
        // No deduction for good parameters
        break;
      case 'borderline-low':
      case 'borderline-high':
        // Deduct 10 points for borderline parameters
        score -= 10;
        break;
      case 'below-range':
      case 'above-range':
        // Deduct 25 points for out-of-range parameters
        score -= 25;
        break;
      default:
        // No deduction for unknown parameters
        break;
    }
  }

  // If no parameters were checked, return 0
  if (paramCount === 0) {
    return 0;
  }

  // Ensure score doesn't go below 0
  return Math.max(0, score);
}