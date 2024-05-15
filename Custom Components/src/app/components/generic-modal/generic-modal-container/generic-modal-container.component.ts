import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WindowDimensions, WindowDimensionsService } from 'src/app/services/window-dimension-service.service';

@Component({
  selector: 'app-generic-modal-container',
  templateUrl: './generic-modal-container.component.html',
  styleUrls: ['./generic-modal-container.component.css']
})
export class ModalContainerComponent implements OnInit {
  defaultStyle: boolean;
  bannerText: string;
  windowDimensions: WindowDimensions = {} as WindowDimensions;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private _windowDimensionService: WindowDimensionsService,
    private matDialog: MatDialogRef<any>) {
    this.defaultStyle = data.defaultStyle;
    this.bannerText = data.bannerText;

    this._windowDimensionService.getWindowDimensions$().subscribe((dimensions) => {
      this.windowDimensions = dimensions;
      let width = this.windowDimensions.width < this.windowDimensions.threshold_sm ? '90%' : 'max-content'
      this.matDialog.updateSize(width)
    });
  }

  ngOnInit(): void { }

}
