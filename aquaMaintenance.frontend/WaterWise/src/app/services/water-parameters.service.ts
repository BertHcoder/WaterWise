import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WaterParameters } from '../models/water-parameters.model';

@Injectable({
  providedIn: 'root'
})
export class WaterParametersService {
  private storageKey = 'waterParameters';
  private waterParametersSubject = new BehaviorSubject<WaterParameters[]>([]);
  public waterParameters$: Observable<WaterParameters[]> = this.waterParametersSubject.asObservable();

  constructor() {
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
    
    const newParameters: WaterParameters = {
      ...parameters,
      id: newId
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
    const updatedData = currentData.map(item => 
      item.id === parameters.id ? parameters : item
    );
    this.waterParametersSubject.next(updatedData);
    this.saveToLocalStorage(updatedData);
  }
}