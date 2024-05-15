import { Component } from '@angular/core';
import { SvgMorphingService } from 'src/app/services/svg-morphing.service';

@Component({
  selector: 'app-svg-load-morph',
  templateUrl: './svg-load-morph.component.html',
  styleUrls: ['./svg-load-morph.component.css']
})
export class SvgLoadMorphComponent {
  constructor(_svgMorphingService: SvgMorphingService) {
    _svgMorphingService.startAnimation(1000);
  }
}
