import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { WindowDimensions, WindowDimensionsService } from 'src/app/services/window-dimension-service.service';
import * as Hammer from 'hammerjs';
import { ScrollLockConfig, ScrollLockService } from 'src/app/services/scroll-lock.service';

export interface SideModalConfig {
  side: 'left' | 'right';
}

const mobileButtonXMargin = 20;
const mobileButtonYMargin = 50;

@Component({
  selector: 'app-generic-side-modal',
  templateUrl: './generic-side-modal.component.html',
  styleUrls: ['./generic-side-modal.component.css']
})
export class GenericSideModalComponent implements AfterViewInit {
  @Input() modal_state_function?: (isOpen: boolean) => void;
  @Input() mobile_backgdrop?: boolean = false;
  @Input() close_delay?: number;
  @Input() defaultStyle?: boolean = true;
  @Input() overrideFullHeight?: boolean = false;
  @Input() handle_extreme_overflow?: boolean = false;
  @Input() sideModalConfig?: SideModalConfig = { side: 'right' };
  @Input() handle_mobile?: boolean = true;
  @Input() sideNavTitleText?: string = undefined;

  @Output() handleCloseEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('mobileButton') mobileButton!: ElementRef;
  @ViewChild('modalContent') modalContent!: ElementRef;

  modalExtended?: boolean = false;
  modalOpen?: boolean = true;
  windowDimensions: WindowDimensions = {} as WindowDimensions;

  private hammer!: HammerManager;
  mobileButtonStartPosX: number = 0; mobileButtonStartPosY: number = 0;
  mobileButtonLastPosX: number = 0; mobileButtonLastPosY: number = 0;

  constructor(private _windowDimensionService: WindowDimensionsService, private scrollLockService: ScrollLockService) {
    this._windowDimensionService.getWindowDimensions$().subscribe((dimensions) => {
      this.windowDimensions = dimensions;
    });
  }

  ngAfterViewInit() {
    if (this.mobileButton && this.handle_mobile) {
      this.mobileButton.nativeElement.style.marginLeft = mobileButtonXMargin + 'px';
      this.mobileButton.nativeElement.style.marginRight = mobileButtonXMargin + 'px';

      this.hammer = new Hammer(this.mobileButton.nativeElement);

      this.hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 0.1, velocity: 0.1 });

      this.hammer.on('panstart', (event: HammerInput) => {
        event.preventDefault();
        this.mobileButtonStartPosX = this.mobileButtonLastPosX;
        this.mobileButtonStartPosY = this.mobileButtonLastPosY;
      });

      this.hammer.on('pan', (event: HammerInput) => {
        event.preventDefault();

        let posX = this.mobileButtonStartPosX + event.deltaX;
        let posY = this.mobileButtonStartPosY + event.deltaY;

        this.mobileButtonLastPosX = posX;
        this.mobileButtonLastPosY = posY;

        this.mobileButton.nativeElement.style.transform = `translate(${posX}px, ${posY}px)`;
      });

      this.hammer.on('panend', () => {
        let currentPosX = this.mobileButton.nativeElement.getBoundingClientRect().right;
        let currentPosY = this.mobileButton.nativeElement.getBoundingClientRect().bottom;

        let posX = currentPosX > (this.windowDimensions.width / 2)
          ? this.windowDimensions.width - this.mobileButton.nativeElement.offsetWidth - (mobileButtonXMargin * 2) : 0;

        let posY = currentPosY <= (this.windowDimensions.height / 2)
          ? (this.windowDimensions.height - this.mobileButton.nativeElement.offsetHeight - (mobileButtonYMargin * 2)) * -1 : 0;

        this.mobileButtonLastPosX = this.mobileButtonStartPosX = posX;
        this.mobileButtonLastPosY = this.mobileButtonStartPosY = posY;
        this.mobileButton.nativeElement.style.transform = `translate(${posX}px, ${posY}px)`;
      });
    }
  }

  ngAfterContentInit() {
    if(this.modalOpen) {
      this.scrollLockService.disableScroll({ 
        allow_touch_input_on: this.modalContent !== undefined ? [this.modalContent.nativeElement] : undefined, 
        main_container: this.modalContent !== undefined ? this.modalContent.nativeElement : undefined,
        handle_extreme_overflow: this.handle_extreme_overflow,
        animation_duration: 0,
        handle_touch_input: true,
        mobile_only_touch_prevention: false
      } as ScrollLockConfig);
    }
  }

  public handleClose(fullClose: boolean = true, overrideClose: boolean = false) {
    if (fullClose) {
      if (this.modal_state_function) {
        if (this.handle_mobile && overrideClose === false) {
          this.toggleModalExtended(false);
        } else {
          this.modalOpen = false;
          setTimeout(() => {
            this.handleCloseEmitter.emit();

            if (this.modal_state_function) {
              this.modal_state_function(false);
            }

            this.scrollLockService.enableScroll();
          }, this.close_delay !== undefined ? this.close_delay : 50);
        }
      }
    } else {
      this.modalExtended = false;
    }
  }

  public toggleModalExtended(state?: boolean) {
    this.modalExtended = state ? state : !this.modalExtended;
    if(this.modalExtended) {
      this.scrollLockService.disableScroll({ 
        allow_touch_input_on: this.modalContent !== undefined ? [this.modalContent.nativeElement] : undefined, 
        main_container: this.modalContent !== undefined ? this.modalContent.nativeElement : undefined,
        handle_extreme_overflow: this.handle_extreme_overflow,
        animation_duration: 0,
        handle_touch_input: true,
        mobile_only_touch_prevention: false
      } as ScrollLockConfig);
    } else {
      this.scrollLockService.enableScroll();
    }
  }

  ngOnDestroy(): void {
    this.scrollLockService.enableScroll();
  }
}
