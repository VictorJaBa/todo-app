import { Component, inject } from '@angular/core';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AsyncPipe } from '@angular/common';
// import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-app';
  // firestore = inject(Firestore);

  constructor() {
  }
}
