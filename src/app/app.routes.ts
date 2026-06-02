import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { authGuard } from './guards/auth.guard';
import { SetupTwoFaComponent } from './components/auth/setup-two-fa/setup-two-fa.component';
import { VerifyTwoFaComponent } from './components/auth/verify-two-fa/verify-two-fa.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'setup-two-fa', component: SetupTwoFaComponent, canActivate: [authGuard] },
    { path: 'verify-two-fa', component: VerifyTwoFaComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
];
