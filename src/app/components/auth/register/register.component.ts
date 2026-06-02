import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink], 
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  name = ''
  email = ''
  password = ''
  confirmPassword = ''
  errorMessage = ''

  async registerWithEmail() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    try {
      await this.authService.register(this.email, this.password);
      this.router.navigate(['']);
    } catch (err: any) {
      this.errorMessage = err.message;
    }
  }

  //Register with Google
  async registerWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
      this.router.navigate(['']);
    } catch (err: any) {
      this.errorMessage = err.message;
    }
  }
}
