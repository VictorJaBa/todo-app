import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  taskService = inject(TaskService)
  taskTitle = ''
  taskDescription = ''
  taskCategory = ''

  submitForm(){
    if(this.taskTitle.trim() === '') return
    this.taskService.addTask(this.taskTitle, this.taskDescription, this.taskCategory);
    this.taskTitle = '',
    this.taskDescription = '',
    this.taskCategory = '';
  }
}
