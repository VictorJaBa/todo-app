import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {

  // 1. Signal privado con la lista de tareas
  private tasks = signal<Task[]>([])

  // 2. Computed: tareas completadas (filtra el array)
  completedTasks = computed(() =>
    this.tasks().filter(task => task.completed)
  )

  // 3. Computed: tareas pendientes
  pendingTask = computed(() =>
    this.tasks().filter(task => !task.completed)
  )

  //4. Métodos CRUD
  addTask(title: string, description?: string, category?: string): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      category,
      completed: false,
      createdAt: new Date(),
    }
    this.tasks.update(tasks => [...tasks, newTask])
  }

  toggleTask(id: number): void {
    this.tasks.update(tasks => tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  deleteTask(id: number): void {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id))
  }

  updateTask(id: number, changes: Partial<Task>): void {
    this.tasks.update(tasks => tasks.map(task => task.id === id ? { ...task, ...changes } : task))
  }

  getTasks() {
    return this.tasks.asReadonly()
  }
}
