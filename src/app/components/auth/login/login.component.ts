import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  email = ''
  password = ''
  errorMessage = ''

  async loginWithEmail() {
    try {
      await this.authService.loginWithEmail(this.email, this.password)
      this.router.navigate(['/'])
    } catch (err: any) {
      this.errorMessage = err.message
    }
  }

  async loginWithGoogle() {
    try {
      await this.authService.loginWithGoogle()
      this.router.navigate(['/'])
    } catch (err: any) {
      this.errorMessage = err.message
    }
  }
}