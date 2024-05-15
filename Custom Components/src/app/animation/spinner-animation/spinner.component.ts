import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpinnerHandlerService } from 'src/app/services/spinner-handler.service';

const MAX_RETRIES = 3;

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  @Output() functionToRetry: EventEmitter<void> = new EventEmitter<void>();
  @Input() secondaryConditionSatisfied: boolean = true;

  spinnerActive: boolean = true;
  triesLeft: number = MAX_RETRIES;

  constructor(public spinnerHandler: SpinnerHandlerService) { }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.spinnerHandler.showSpinner.subscribe(this.showSpinner.bind(this));
    }, 50);
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
    document.body.style.height = '100%';
    document.body.style.paddingRight = '0px';
  }

  showSpinner = (state: boolean): void => {
    if(state === this.secondaryConditionSatisfied){
      this.spinnerActive = state;
      return;
    } else {
      this.spinnerActive = state;
    }
  };

  public retry(): void {
    if(this.triesLeft > 0){
      this.triesLeft--;
      this.functionToRetry.emit();
    }
  }

}
