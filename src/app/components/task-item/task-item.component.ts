import { Component, inject, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input () task!: Task
  taskService = inject(TaskService)

  toggle(){
    this.taskService.toggleTask(this.task.id)
  }

  delete(){
    this.taskService.deleteTask(this.task.id)
  }
}
