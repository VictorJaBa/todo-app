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
    const result = await this.authService.loginWithEmail(this.email, this.password)
    const hasTwoFA = await this.authService.hasTotpEnabled(result.user.uid)
    console.log('hasTwoFA:', hasTwoFA)
    console.log('uid', result.user.uid)

    if (hasTwoFA) {
      this.router.navigate(['/verify-two-fa'])
    } else {
      this.router.navigate(['/'])
    }
  } catch (err: any) {
    this.errorMessage = err.message
  }
}

  async loginWithGoogle() {
  try {
    const result = await this.authService.loginWithGoogle()
    const hasTwoFA = await this.authService.hasTotpEnabled(result.user.uid)

    if (hasTwoFA) {
      this.router.navigate(['/verify-two-fa'])
    } else {
      this.router.navigate(['/'])
    }
  } catch (err: any) {
    this.errorMessage = err.message
  }
}
}