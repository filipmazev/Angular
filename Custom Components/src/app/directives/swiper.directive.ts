import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { SwiperOptions } from 'swiper/types/swiper-options';
import Swiper from 'swiper';
import { SwiperContainer } from 'swiper/element';
import { WindowDimensions, WindowDimensionsService } from '../services/window-dimension-service.service';

const REM_SIZE_IN_PX = 16;
const MAX_ELEMENTS_IN_VIEW_BRAKE1 = 5;
const MAX_ELEMENTS_IN_VIEW_BRAKE2 = 3;
const ELEMENT_WIDTH_RATIO_BRAKE1 = 0.61485;
const ELEMENT_WIDTH_RATIO_BRAKE2 = 0.76;

export class SwiperEvent {
  slide: HTMLElement | undefined;
  swiper?: Swiper;

  constructor(swiper: Swiper | undefined, slide: HTMLElement | undefined) {
    this.slide = slide;
    this.swiper = swiper;
  }
}

@Directive({
  selector: '[fmSwiper]',
  standalone: true,
})
export class SwiperDirective {
  swiperElement: HTMLElement;
  swiper?: Swiper;
  originalSwiperSide: number = 0;

  @Output() slideChanged: EventEmitter<SwiperEvent> = new EventEmitter<SwiperEvent>();

  windowDimensions: WindowDimensions = {} as WindowDimensions;

  constructor(private el: ElementRef<HTMLElement>, private _windowDimensionService: WindowDimensionsService) {
    this.swiperElement = el.nativeElement;

    this._windowDimensionService.getWindowDimensions$().subscribe((dimensions) => {
      this.windowDimensions = dimensions;
      this.calculateSliderContainerMaxWidth();
    });
  }

  public generateSlides(config: SwiperOptions) {
    Object.assign(this.el.nativeElement, config);

    setTimeout(() => {
      // @ts-ignore
      this.el.nativeElement.initialize();

      this.swiper = (this.el.nativeElement as SwiperContainer).swiper;
     
      this.originalSwiperSide = this.swiperElement.clientWidth;
      this.calculateSliderContainerMaxWidth();
      
      this.swiper.on('transitionEnd', () => {
        const activeSlide = this.swiper?.slides[this.swiper.activeIndex];
        this.slideChanged.emit(new SwiperEvent(this.swiper, activeSlide));
      });
    }, 50); 
  }

  private calculateSliderContainerMaxWidth() {
    // Calculate the width of the swiper container
    if(this.el.nativeElement && this.el.nativeElement.children.length > 0) {
      if(this.windowDimensions.width >= this.windowDimensions.threshold_md){
        const firstChildWidth = this.el.nativeElement.children[0].clientWidth;
        let calculatedWidth = 0;
  
        if(this.el.nativeElement.children.length > MAX_ELEMENTS_IN_VIEW_BRAKE1){
          calculatedWidth = (((firstChildWidth / REM_SIZE_IN_PX) * ELEMENT_WIDTH_RATIO_BRAKE1) * MAX_ELEMENTS_IN_VIEW_BRAKE1);
        } else if (this.el.nativeElement.children.length > MAX_ELEMENTS_IN_VIEW_BRAKE2){
          calculatedWidth = (((firstChildWidth / REM_SIZE_IN_PX) * ELEMENT_WIDTH_RATIO_BRAKE2) * MAX_ELEMENTS_IN_VIEW_BRAKE2);
        } else if (this.el.nativeElement.children.length > 0){
          calculatedWidth = (firstChildWidth / REM_SIZE_IN_PX);
        }

        this.el.nativeElement.style.maxWidth = `${calculatedWidth}rem`;
      } else {
        this.el.nativeElement.style.maxWidth =  this.originalSwiperSide !== 0 ? `${this.originalSwiperSide}px` : '100%';
      }
    }
  }

  public nextSlide(){
    if(this.swiper){
      this.swiper.slideNext();
    }
  }

  public previousSlide(){
    if(this.swiper){
      this.swiper.slidePrev();
    }
  }
  
}