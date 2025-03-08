import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WaterParameters, ParameterFeedback, ParameterStatus } from '../models/water-parameters.model';
import { getParameterStatus, calculateHealthScore } from '../models/parameter-ranges.model';
import { BaseDataService } from './data/dataService';

@Injectable({
  providedIn: 'root'
})
export class WaterParametersService extends BaseDataService<WaterParameters> {
  private storageKey = 'waterParameters';
  private waterParametersSubject = new BehaviorSubject<WaterParameters[]>([]);
  public waterParameters$: Observable<WaterParameters[]> = this.waterParametersSubject.asObservable();

  super() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedData = localStorage.getItem(this.storageKey);
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        this.waterParametersSubject.next(data);
      } catch (e) {
        console.error('Error parsing stored water parameters', e);
        this.waterParametersSubject.next([]);
      }
    }
  }

  private saveToLocalStorage(data: WaterParameters[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getAllParameters(): Observable<WaterParameters[]> {
    return this.waterParameters$;
  }

  addParameters(parameters: Omit<WaterParameters, 'id'>): void {
    const currentData = this.waterParametersSubject.value;
    const newId = currentData.length > 0 
      ? Math.max(...currentData.map(item => item.id)) + 1 
      : 1;
    
    // Calculate health score
    const healthScore = calculateHealthScore({
      ph: parameters.ph,
      ammonia: parameters.ammonia,
      nitrite: parameters.nitrite,
      nitrate: parameters.nitrate,
      gh: parameters.gh,
      kh: parameters.kh
    });
    
    const newParameters: WaterParameters = {
      ...parameters,
      id: newId,
      healthScore
    };

    const updatedData = [...currentData, newParameters];
    this.waterParametersSubject.next(updatedData);
    this.saveToLocalStorage(updatedData);
  }

  deleteParameters(id: number): void {
    const currentData = this.waterParametersSubject.value;
    const updatedData = currentData.filter(item => item.id !== id);
    this.waterParametersSubject.next(updatedData);
    this.saveToLocalStorage(updatedData);
  }

  updateParameters(parameters: WaterParameters): void {
    const currentData = this.waterParametersSubject.value;
    
    // Recalculate health score
    const healthScore = calculateHealthScore({
      ph: parameters.ph,
      ammonia: parameters.ammonia,
      nitrite: parameters.nitrite,
      nitrate: parameters.nitrate,
      gh: parameters.gh,
      kh: parameters.kh
    });
    
    const updatedParameters = {
      ...parameters,
      healthScore
    };
    
    const updatedData = currentData.map(item => 
      item.id === parameters.id ? updatedParameters : item
    );
    
    this.waterParametersSubject.next(updatedData);
    this.saveToLocalStorage(updatedData);
  }

  getParameterFeedback(parameters: {
    ph?: number;
    ammonia?: number;
    nitrite?: number;
    nitrate?: number;
    gh?: number;
    kh?: number;
  }): ParameterFeedback {
    const getStatus = (param: string, value: number): ParameterStatus => {
      return {
        value,
        status: getParameterStatus(param, value) as any
      };
    };

    const healthScore = calculateHealthScore(parameters);
    
    // Determine overall status based on health score
    let overallStatus: 'excellent' | 'good' | 'caution' | 'poor' | 'critical';
    
    if (healthScore >= 90) {
      overallStatus = 'excellent';
    } else if (healthScore >= 75) {
      overallStatus = 'good';
    } else if (healthScore >= 50) {
      overallStatus = 'caution';
    } else if (healthScore >= 25) {
      overallStatus = 'poor';
    } else {
      overallStatus = 'critical';
    }

    return {
      ph: getStatus('ph', parameters.ph || 0),
      ammonia: getStatus('ammonia', parameters.ammonia || 0),
      nitrite: getStatus('nitrite', parameters.nitrite || 0),
      nitrate: getStatus('nitrate', parameters.nitrate || 0),
      gh: getStatus('gh', parameters.gh || 0),
      kh: getStatus('kh', parameters.kh || 0),
      healthScore,
      overallStatus
    };
  }
}