import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/components/button/button.component';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './start.component.html',
})
export class StartComponent {
  
  test(){
    alert('test');
  }
}
