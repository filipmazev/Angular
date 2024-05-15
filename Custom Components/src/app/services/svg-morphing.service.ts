import { Injectable, Input } from '@angular/core';
import anime from 'animejs/lib/anime.es';
import { ScrollLockConfig, ScrollLockService } from './scroll-lock.service';

@Injectable({
  providedIn: 'root'
})
export class SvgMorphingService {
  @Input() animDuration: number = 3000;
  extreme_overflow: boolean = true;

  constructor(private scrollLockService: ScrollLockService){ }

  startAnimation(animDuration?: number) {
    setTimeout(() => { 
      let checkForMorphElement = document.querySelector('.morph');
      if (checkForMorphElement !== null) {          
        
        this.scrollLockService.disableScroll({
          allow_touch_input_on: undefined,
          handle_extreme_overflow: this.extreme_overflow,
          animation_duration: 0,
          handle_touch_input: true,
          mobile_only_touch_prevention: false,
        } as ScrollLockConfig);
        const morphing = anime({
          targets: '.morph',
          d: [
            { value: 'M 0 0 V 785 S 83 569 406 437 C 774 296 1032 843 1238 716 S 1343 403 1640 347 S 1916 -5 1919.869 0 V 0 Z' },
            { value: 'M 0 0 V 0 S 93 1 425.688 0 C 759 0 586 0 988.143 0 S 1257 0 1588.209 0 S 1718 0 1919.869 0 V 0 Z' }
          ],
          easing: 'linear',
          duration: animDuration ?? this.animDuration,
          loop: false
        });
  
        setTimeout(() => {
          setTimeout(() => {
            const svgOnLoad = document.querySelector('.morph');
            if (svgOnLoad) {
              svgOnLoad.classList.add('hidden');
              this.scrollLockService.enableScroll(true);
            }
          }, 5);
        }, animDuration ?? this.animDuration);
      }
    }, 10);
  }
}
