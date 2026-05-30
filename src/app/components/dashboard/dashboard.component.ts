import { Component } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskFilterComponent } from '../task-filter/task-filter.component';

@Component({
  selector: 'app-dashboard',
  imports: [TaskFormComponent, TaskListComponent, TaskFilterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
