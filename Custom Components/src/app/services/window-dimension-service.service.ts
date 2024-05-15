import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WindowDimensionsService {
  private windowDimensionsSubject = new BehaviorSubject<WindowDimensions>(
    this.getWindowDimensions()
  );

  constructor() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  getWindowDimensions(): WindowDimensions {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      threshold_xs: 450,
      threshold_sm: 640,
      threshold_md: 768,
      threshold_lg: 1024,
      threshold_xl: 1280,
      threshold_2xl: 1536,
      threshold_3xl: 1920,
      threshold_4xl: 2560,
    };
  }

  private handleResize() {
    this.windowDimensionsSubject.next(this.getWindowDimensions());
  }

  getWindowDimensions$(): Observable<WindowDimensions> {
    return this.windowDimensionsSubject.asObservable();
  }
}

export interface WindowDimensions {
  [x: string]: any;
  width: number;
  height: number;
  threshold_xs: number;
  threshold_sm: number;
  threshold_md: number;
  threshold_lg: number;
  threshold_xl: number;
  threshold_2xl: number;
  threshold_3xl: number;
  threshold_4xl: number;
}
