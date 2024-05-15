import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerHandlerService {
  public numberOfRequests: number = 0;
  private requestTimeout: number = 100; 
  private timeoutId: any;
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  handleRequest = (state: string = 'minus'): void => {
    this.numberOfRequests = (state === 'plus') ? this.numberOfRequests + 1 : this.numberOfRequests - 1;
    if (this.numberOfRequests <= 0) {
      if (this.timeoutId) clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.showSpinner.next(false);
        this.timeoutId = null;
      }, this.requestTimeout);
    } else {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
      this.showSpinner.next(true);
    }
  };
}
