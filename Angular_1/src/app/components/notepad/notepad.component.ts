import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.css']
})
export class NotepadComponent {
  title: string = 'Task Scheduler';
  showAddTask: boolean = false;
  subscription: Subscription = new Subscription;

  constructor(private uiService: UiService) { 
    this.subscription = this.uiService.onToggle().subscribe((value) => this.showAddTask = value);
  }

  toggleAddTask(){
    this.uiService.toggleAddTask();
  }

}