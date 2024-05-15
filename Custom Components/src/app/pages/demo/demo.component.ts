import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GenericModalComponent } from 'src/app/components/generic-modal/generic-modal.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements AfterViewInit {
 
  secondaryLoadCondition: boolean = false;
  showGenericPopup: boolean = false;

  @ViewChild("genericPopup") GenericPopup!: GenericModalComponent;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.secondaryLoadCondition = true;
    }, 5000);
  }

  onClosePopup() {
    if(this.GenericPopup){
      this.GenericPopup.handleClose();
    }

    this.showGenericPopup = false;
  }

  public toggleGenericPopup(state?: boolean) {
    this.showGenericPopup = state ?? !this.showGenericPopup;
  }

}
