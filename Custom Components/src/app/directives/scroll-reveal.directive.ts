import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[scrollReveal]',
})
export class ScrollRevealDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('window:scroll', ['$event']) onScroll(event: Event) {
    this.reveal();
  }

  private reveal() {
    const reveals = document.querySelectorAll('.reveal');

    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const revealTop = reveals[i].getBoundingClientRect().top;
      const revealPoint = 100;
      
      if (revealTop < windowHeight - revealPoint) {
        this.renderer.addClass(reveals[i], 'revealed');
      } else {
        this.renderer.removeClass(reveals[i], 'revealed');
      }
    }
  }
}
