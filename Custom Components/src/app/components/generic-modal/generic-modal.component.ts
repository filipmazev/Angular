import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScrollLockConfig, ScrollLockService } from 'src/app/services/scroll-lock.service';
import { WindowDimensions, WindowDimensionsService } from 'src/app/services/window-dimension-service.service';
import { ModalContainerComponent } from './generic-modal-container/generic-modal-container.component';
import { ViewEncapsulation } from '@angular/core';
import { SwipeableModalComponent } from './swipeable-modal/swipeable-modal.component';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GenericModalComponent implements OnInit, AfterViewInit {
  @Output() handleCloseEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Input() modal_state_function?: (isOpen: boolean) => void;
  @Input() backgdrop?: boolean = true;
  @Input() defaultStyle?: boolean;
  @Input() bannerText?: string;

  // WARNING: may cause some mouse/touch input issues
  @Input() handle_extreme_overflow?: boolean = false;

  @Input() close_delay?: number;
  @Input() mobile_wrapper_class: string = '';
  @Input() mobile_handle_overflow_input?: boolean = true;
  @Input() mobile_up_swipe_limiter?: number;
  @Input() mobile_down_swipe_limiter?: number;
  @Input() mobile_custom_height?: number;
  @Input() mobile_opacity_modifier?: number;

  @Input() handle_mobile?: boolean = true;

  @ViewChild('dynamicComponentTemplate') dynamicComponentTemplate?: TemplateRef<any>;
  @ViewChild('modalContent') modalContent?: ElementRef;
  @ViewChild('mobileModal') mobileModal?: SwipeableModalComponent;

  hasLargeModal: boolean = false;
  hasSmallModal: boolean = false;
  modalOpen?: boolean = true;
  windowDimensions: WindowDimensions = {} as WindowDimensions;
  tempClose: boolean = true;

  constructor(private scrollLockService: ScrollLockService,
    private _windowDimensionService: WindowDimensionsService,
    private dialog: MatDialog) {
    this._windowDimensionService.getWindowDimensions$().subscribe((dimensions) => {
      this.windowDimensions = dimensions;

      if (this.handle_mobile) {
        if (this.windowDimensions.width < this.windowDimensions.threshold_sm && this.hasLargeModal && !this.hasSmallModal && this.modalOpen) {
          if (this.dialog.openDialogs.length > 0) { this.dialog.closeAll(); }
          this.hasLargeModal = false; this.hasSmallModal = true;
        }

        if (this.windowDimensions.width >= this.windowDimensions.threshold_sm && !this.hasLargeModal && this.hasSmallModal && this.modalOpen) {
          if (this.dialog.openDialogs.length === 0) { this.openMainModal(); }
          this.hasLargeModal = true; this.hasSmallModal = false;
        }
      }
    });
  }

  ngOnInit() {
    if (this.handle_mobile && this.windowDimensions.width < this.windowDimensions.threshold_sm) {
      this.hasLargeModal = false; this.hasSmallModal = true;
    } else {
      this.hasLargeModal = true; this.hasSmallModal = false;
    }
  }

  ngAfterViewInit(): void {
    if ((this.windowDimensions.width >= this.windowDimensions.threshold_sm) || !this.handle_mobile) {
      this.openMainModal();
      this.hasLargeModal = true; this.hasSmallModal = false;
    } else if (this.handle_mobile) { this.hasLargeModal = false; this.hasSmallModal = true; }
  }

  private openMainModal() {
    if (((!this.handle_mobile || (this.windowDimensions.width >= this.windowDimensions.threshold_sm)) && this.dialog.openDialogs.length) === 0) {
      let width = this.windowDimensions.width < this.windowDimensions.threshold_sm ? '95%' : 'max-content';

      const dialogRef = this.dialog.open(ModalContainerComponent, {
        width: width,
        hasBackdrop: this.backgdrop,
        panelClass: 'generic-pop-up',
        data: {
          dynamicComponent: this.dynamicComponentTemplate,
          defaultStyle: this.defaultStyle,
          bannerText: this.bannerText
        }
      });

      dialogRef.keydownEvents().subscribe(event => {
        if (event.key === "Escape") { this.handleClose(true); }
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result === false) { this.handleClose(!this.handle_mobile); }
      });

      dialogRef.backdropClick().subscribe(() => { this.handleClose(true); });

      this.scrollLockService.disableScroll(
        { allow_touch_input_on: this.modalContent !== undefined ? [this.modalContent.nativeElement] : undefined, 
          handle_extreme_overflow: this.handle_extreme_overflow,
          animation_duration: 0,
          handle_touch_input: false,
          mobile_only_touch_prevention: true
        } as ScrollLockConfig
      );
    }
  }

  public handleClose(fullClose: boolean = true) {
    this.scrollLockService.enableScroll(this.handle_extreme_overflow);
    this.mobileModal?.removeScrollLocks();

    if (fullClose) {
      if (this.dialog.openDialogs.length > 0) { this.dialog.closeAll(); }

      this.modalOpen = false;
      setTimeout(() => {
        this.handleCloseEmitter.emit();

        if (this.modal_state_function) {
          this.modal_state_function(false);
        }

      }, this.close_delay !== undefined ? this.close_delay : 50);
    }
  }
}
