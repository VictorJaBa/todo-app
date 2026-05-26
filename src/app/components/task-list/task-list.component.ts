import { Component, inject, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';



@Component({
  selector: 'app-task-list',
  imports: [TaskItemComponent],
  templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.css'
  })
  export class TaskListComponent {
    taskService = inject(TaskService)
    tasks = this.taskService.getTasks()
  }

