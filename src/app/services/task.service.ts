import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {

  // 1. Signal privado con la lista de tareas
  private tasks = signal<Task[]>([])

  // 2. Computed: completed tasks (filter array)
  completedTasks = computed(() =>
    this.tasks().filter(task => task.completed)
  )

  // 3. Computed: pending tasks
  pendingTask = computed(() =>
    this.tasks().filter(task => !task.completed)
  )

  //4. CRUD Methods 
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

  // 1. Signal with the active filter
  // Posible values: 'all', 'pending', 'completed'
  activeFilter = signal<'all' | 'pending' | 'completed'>('all')

  // 2. Method to change the filter
  setFilter(filter: 'all' | 'pending' | 'completed'): void {
    this.activeFilter.set(filter)
  }

  // 3. Computed: tasks filtered by the active filter
  filteredTasks = computed(() => {
    const filter = this.activeFilter()
    const tasks = this.tasks()
    return filter === 'all' ? tasks : filter === 'pending' ? tasks.filter(task => !task.completed) : tasks.filter(task => task.completed)
  })


}

