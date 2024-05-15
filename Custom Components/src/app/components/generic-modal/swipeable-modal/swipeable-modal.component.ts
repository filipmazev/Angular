import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { WindowDimensions, WindowDimensionsService } from 'src/app/services/window-dimension-service.service';
import * as Hammer from 'hammerjs';
import { ScrollLockConfig, ScrollLockService } from 'src/app/services/scroll-lock.service';

@Component({
  selector: 'app-swipeable-modal',
  templateUrl: './swipeable-modal.component.html',
  styleUrls: ['./swipeable-modal.component.css']
})
export class SwipeableModalComponent implements OnInit {
  private hammer!: HammerManager;

  isFinished: boolean = false;
  isSwiping: boolean = false;
  modalTranslate: number = 0;

  @Input() modal_state_function?: (isOpen: boolean) => void;
  @Input() wrapper_class: string = '';
  @Input() handle_overflow_input?: boolean;
  @Input() up_swipe_limiter?: number;
  @Input() down_swipe_limiter?: number;
  @Input() custom_height?: number;
  @Input() opacity_modifier?: number;
  @Input() close_delay?: number;

  @Output() handleCloseEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('childrenRef', { static: true }) childrenRef?: ElementRef;
  @ViewChild('targetElement', { static: true }) targetElement?: ElementRef;
  @ViewChild('modalContent', { static: true }) modalContent?: ElementRef;

  down_limit: number = 0;
  up_limit: number = 0;
  child_height: number = 0;
  handle_overflow: boolean = true;
  windowInnerHeight: number = window.innerHeight;

  windowDimensions: WindowDimensions = {} as WindowDimensions;

  constructor(private _windowDimensionService: WindowDimensionsService, private scrollLockService: ScrollLockService) { }

  ngOnInit(): void {
    this._windowDimensionService
      .getWindowDimensions$()
      .subscribe((dimensions) => {
        this.windowDimensions = dimensions;
        this.windowInnerHeight = window.innerHeight;
      });

    this.down_limit = this.down_swipe_limiter
      ? this.down_swipe_limiter > 0
        ? this.down_swipe_limiter
        : 1
      : 2;

    this.up_limit = this.up_swipe_limiter
      ? this.up_swipe_limiter > 0
        ? this.up_swipe_limiter
        : 1
      : window.innerHeight;

    this.child_height = this.custom_height
      ? this.custom_height > 0
        ? this.custom_height
        : 100
      : this.childrenRef && this.childrenRef.nativeElement
        ? this.childrenRef.nativeElement.offsetHeight
        : 100;

    this.handle_overflow = this.handle_overflow_input ?? true;
  }

  ngAfterViewInit() {
    if (this.targetElement?.nativeElement) {
      this.hammer = new Hammer(this.targetElement.nativeElement);

      this.hammer
        .get('pan')
        .set({ direction: Hammer.DIRECTION_ALL, threshold: 0.1, velocity: 0.1 });

      this.hammer.on('pan', (event: HammerInput) => {
        event.preventDefault();
        this.handleSwipeMove(event);

        if (event.isFinal) {
          this.isSwiping = false;
          const halfChildrenHeight = this.child_height / this.down_limit;
          if (this.modalTranslate > halfChildrenHeight) {
            this.handleClose();
          } else {
            this.modalTranslate = 0;
          }
        }
      });
    }

    if(this.handle_overflow){
      this.scrollLockService.disableScroll({ 
        allow_touch_input_on: this.childrenRef !== undefined && this.modalContent !== undefined && this.targetElement !== undefined ? [this.childrenRef.nativeElement, this.modalContent?.nativeElement, this.targetElement?.nativeElement] : undefined,
        main_container: this.childrenRef !== undefined ? this.childrenRef.nativeElement : undefined,
        handle_extreme_overflow: false,
        animation_duration: 350,
        handle_touch_input: true,
        mobile_only_touch_prevention: true
      } as ScrollLockConfig);
    }
  }

  handleSwipeMove(event: HammerInput) {
    this.isFinished = false;
    this.isSwiping = true;
    this.modalTranslate = event.deltaY;
  }

  public handleClose() {
    this.isFinished = true;
    setTimeout(() => {
      this.handleCloseEmitter.emit();

      if (this.modal_state_function) {
        this.modal_state_function(false);
      }

      if(this.handle_overflow){
        this.scrollLockService.enableScroll(false);
      }

    }, this.close_delay !== undefined ? this.close_delay : 250);
  }

  public removeScrollLocks() {
    this.scrollLockService.enableScroll(false);
  }

  ngOnDestroy(): void {
    if (this.handle_overflow === true) {
      this.scrollLockService.enableScroll(false);
    }
  }
}
