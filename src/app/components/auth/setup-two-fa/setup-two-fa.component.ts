import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { TotpService } from '../../../services/totp.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-setup-2fa',
  imports: [FormsModule],
  templateUrl: './setup-two-fa.component.html',
  styleUrl: './setup-two-fa.component.css'
})
export class SetupTwoFaComponent implements OnInit {
  authService = inject(AuthService)
  totpService = inject(TotpService)
  router = inject(Router)

  qrCodeUrl = signal('')
  secret = signal('')
  verificationCode = ''
  errorMessage = ''

  async ngOnInit() {
    const user = this.authService.currentUser()
    if (!user) return this.router.navigate(['/login'])

    //Generate the secret and the QR code
    const newSecret = this.totpService.generateSecretKey()
    this.secret.set(newSecret)
    const qr = await this.totpService.generateQRCode(user.email!, newSecret)
    this.qrCodeUrl.set(qr)
    return
  }

  async confirmSetup(){
    const user = this.authService.currentUser()
    if(!user) return

    //Verify the code before saving it
    const isValid = await this.totpService.verifyToken(
      this.verificationCode,
      this.secret()
    )

    if(!isValid) {
      this.errorMessage = 'Invalid code. Please try again.'
      return
    }

    //Save the secret in Firestore
    await this.authService.saveTotpSecret(user.uid, this.secret())
    this.router.navigate(['/'])
  }
}
