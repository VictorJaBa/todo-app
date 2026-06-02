import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { TotpService } from '../../../services/totp.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-two-fa',
  imports: [FormsModule],
  templateUrl: './verify-two-fa.component.html',
  styleUrl: './verify-two-fa.component.css'
})
export class VerifyTwoFaComponent {
  authService = inject(AuthService)
  totpService = inject(TotpService)
  router = inject(Router)

  verificationCode = ''
  errorMessage = ''

  async verify(): Promise<void> {
  const user = this.authService.currentUser()
  if (!user) {
    this.router.navigate(['/login'])
    return
  }

  const secret = await this.authService.getTotpSecret(user.uid)
  if (!secret) {
    this.router.navigate(['/login'])
    return
  }

  const isValid = await this.totpService.verifyToken(
    this.verificationCode,
    secret
  )

  if (!isValid) {
    this.errorMessage = 'Invalid code. Please try again.'
    return
  }

  this.router.navigate(['/'])
}
}