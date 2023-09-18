import { Component, Output, EventEmitter } from '@angular/core';
import { Subscription } from "rxjs";

import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter;
  
  text: string = "";
  date: string = "";
  reminder: boolean = false;
  tasks: Task[] = [];
  showAddTask: boolean = false;
  
  subscription: Subscription = new Subscription;

  constructor(private tasksService: TaskService, private uiService: UiService){ 
    this.subscription = this.uiService.onToggle().subscribe((value) => this.showAddTask = value);
  }

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onSubmit(){
    if(!this.text){ alert('Please add a task!'); return; }
    if(!this.date){ alert('Please add a date!'); return;  }
    
    const newTask = {
        id: this.tasks[this.tasks.length-1].id + 1,
        text: this.text,
        date: this.date,
        reminder: this.reminder
    }

    this.onAddTask.emit(newTask);

    this.text = '';
    this.date = '';
    this.reminder = false;
  }

}
