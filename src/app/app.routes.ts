import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' }
];
