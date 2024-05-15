import { Component, ElementRef, Input, ViewChild } from '@angular/core';

const COLORS = [
  { r: 142, g: 89, b: 255 },
  { r: 100, g: 49, b: 195 },
  { r: 4, g: 133, b: 178 },
  { r: 171, g: 75, b: 200 },
  { r: 85, g: 13, b: 119 },
]

const PI2 = Math.PI * 2;

export class GlowParticle {
  x: number;
  y: number;
  radius: number;
  rgb: { r: number, g: number, b: number };
  alpha: number;
  vx: number;
  vy: number;
  sinValue: number;

  constructor(x: number, y: number, radius: number, rgb: { r: number, g: number, b: number }){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.rgb = rgb;
    this.alpha = 0.85;

    this.vx = Math.random() * 10;
    this.vy = Math.random() * 10;

    this.sinValue = Math.random();
  }

  animate(ctx: CanvasRenderingContext2D | null, stageWidth: number, stageHeight: number){
    this.sinValue += 0.01;

    this.radius += Math.sin(this.sinValue);

    this.x += this.vx;
    this.y += this.vy;

    if(this.x < 0){
      this.vx *= -1;
      this.x += 10;
    } else if(this.x > stageWidth){
      this.vx *= -1;
      this.x -= 10;
    }

    if(this.y < 0){
      this.vy *= -1;
      this.y += 10;
    } else if(this.y > stageHeight){
      this.vy *= -1;
      this.y -= 10;
    }

    if(ctx !== null){
      ctx.beginPath();

      const g = ctx.createRadialGradient(this.x, this.y, this.radius * 0.0125, this.x, this.y, this.radius);
      g.addColorStop(0, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, ${this.alpha})`);
      g.addColorStop(1, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 0)`);

      ctx.fillStyle = g;
      ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
      ctx.fill();
    }
  }
}

@Component({
  selector: 'app-colorful-canvas',
  standalone: false,
  templateUrl: './colorful-canvas.component.html',
  styleUrls: ['./colorful-canvas.component.css']
})
export class ColorfulCanvasComponent {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() blackOverlay: boolean = false;

  ctx: CanvasRenderingContext2D | null = null;
  pixelRation: number = 0;
  totalParticles: number = 3;
  particles: any[] = [];
  maxRadius: number = 1750;
  minRadius: number = 1500;
  stageWidth: number = 0;
  stageHeight: number = 0;

  constructor() { }

  ngAfterViewInit(): void {
      if(this.canvasRef){
        this.ctx = this.canvasRef.nativeElement.getContext('2d');
        this.pixelRation = (window.devicePixelRatio > 1 ? 2 : 1);

        window.addEventListener('resize', this.resize.bind(this)), false;
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
      }
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvasRef.nativeElement.width = this.stageWidth * this.pixelRation;
    this.canvasRef.nativeElement.height = this.stageHeight * this.pixelRation;
    this.ctx?.scale(this.pixelRation, this.pixelRation);
    
    this.createParticles();
  }

  createParticles(){
    let curColor = 0;
    this.particles = [];

    for(let i = 0; i < this.totalParticles; i++){
      const item = new GlowParticle(
        Math.random() * this.stageWidth,
        Math.random() * this.stageHeight,
        Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
        COLORS[curColor]
      );

      if(++curColor >= COLORS.length){
        curColor = 0;
      }

      this.particles[i] = item;
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for(let i = 0; i < this.totalParticles; i++){
      this.particles[i].animate(this.ctx, this.stageWidth, this.stageHeight);
    }
  }

}
