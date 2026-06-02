import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { authGuard } from './guards/auth.guard';
import { VerifyTwoFaComponent } from './components/auth/verify-two-fa/verify-two-fa.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'verify-two-fa', component: VerifyTwoFaComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
];
