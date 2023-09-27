import { Component, Input, Output, EventEmitter, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements AfterViewInit {
  @Input() href?: string;
  @Input() content?: string;
  @Input() dimension_styling?: string;
  @Input() text_styling?: string;
  @Input() custom_styling?: string;
  @Input() overide_styling?: string;
  @Input() custom_animation?: string;
  @Input() bg?: string;
  @Input() custom_delay?: number;

  @Output() btnClick = new EventEmitter();

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.content) {
      const div = this.renderer.createElement('div');
      this.renderer.setProperty(div, 'innerHTML', this.content);
      this.renderer.appendChild(this.el.nativeElement.querySelector('.button-content'), div);
    }
  }

  handleClick(): void {
    if (this.btnClick) {
      (async () => { 
        this.btnClick.emit();
        if (this.href) {
          await delay(this.custom_delay !== undefined ? this.custom_delay : 100);
          window.location.href = this.href; 
        }
    })();
    } if (this.href) { 
      window.location.href = this.href; 
    }
  }

  getButtonClasses(): string {
    return `${this.overide_styling === undefined ? 'rounded-[3px] items-center justify-center align-middle text-center custom-shadow leading-none select-none border-[2px] border-darker' : this.overide_styling}
      ${this.custom_animation === undefined ? 'xl:active:translate-y-[2px] xl:hover:translate-y-[-4px] xl:hover:scale-[1.005] transition-none duration-0 md:transition-all md:duration-100' : this.custom_animation}
      ${this.dimension_styling === undefined ? 'px-[1rem] py-[.5rem] min-w-[15vw]' : this.dimension_styling}
      ${this.text_styling === undefined ? 'text-[#030301] text-[2rem]' : this.text_styling}
      ${this.custom_styling === undefined ? '' : this.custom_styling}
      ${this.bg === undefined ? 'bg-[#fffff3]' : this.bg}`;
  }
}
