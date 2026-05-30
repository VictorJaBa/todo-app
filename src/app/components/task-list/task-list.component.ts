import { Component, inject, computed } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskFilterComponent } from '../task-filter/task-filter.component';


@Component({
  selector: 'app-task-list',
  imports: [TaskItemComponent],
  templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.css'
  })
  export class TaskListComponent {
    taskService = inject(TaskService)
    tasks = this.taskService.filteredTasks
    pendingTask = this.taskService.pendingTask
  }
