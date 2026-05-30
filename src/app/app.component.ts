import { Component, inject } from '@angular/core';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';
// import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  imports: [TaskFormComponent, TaskListComponent, TaskFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-app';
  // firestore = inject(Firestore);
  constructor() {
  }
}
