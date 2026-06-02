import { Component, inject } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskFilterComponent } from '../task-filter/task-filter.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [TaskFormComponent, TaskListComponent, TaskFilterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
