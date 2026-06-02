import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskFilterComponent } from '../task-filter/task-filter.component';
import { AuthService } from '../../services/auth.service';
import { TotpService } from '../../services/totp.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [TaskFormComponent, TaskListComponent, TaskFilterComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService)
  totpService = inject(TotpService)
  router = inject(Router)

  // Control del modal
  showSetup2FA = false
  qrCodeUrl = signal('')
  secret = signal('')
  verificationCode = ''
  errorMessage2FA = ''
  totpEnabled = false

  async ngOnInit() {
    const user = this.authService.currentUser()
    if (user) {
      this.totpEnabled = await this.authService.hasTotpEnabled(user.uid)
    }
  }

  async enable2FA() {
    const user = this.authService.currentUser()
    if (!user) return

    const newSecret = this.totpService.generateSecretKey()
    this.secret.set(newSecret)
    const qr = await this.totpService.generateQRCode(user.email!, newSecret)
    this.qrCodeUrl.set(qr)
    this.showSetup2FA = true
  }

  async confirmSetup() {
    const user = this.authService.currentUser()
    if (!user) return

    const isValid = await this.totpService.verifyToken(
      this.verificationCode,
      this.secret()
    )

    if (!isValid) {
      this.errorMessage2FA = 'Invalid code. Please try again.'
      return
    }

    await this.authService.saveTotpSecret(user.uid, this.secret())
    this.totpEnabled = true
    this.showSetup2FA = false
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}