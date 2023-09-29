import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getValue(key: string, defaultValue: any = null): any {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : defaultValue;
  }

  setValue(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
