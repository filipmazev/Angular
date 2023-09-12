import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NotepadComponent } from './components/notepad/notepad.component';
import { ButtonComponent } from './components/button/button.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

const appRoutes: Routes = [
  {path: '', component: TasksComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NotepadComponent,
    ButtonComponent,
    TasksComponent,
    TaskItemComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
