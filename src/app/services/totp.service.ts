import { Injectable } from '@angular/core';
import { generateSecret, generateURI, verify } from 'otplib';
import QRCode from 'qrcode'

@Injectable({
  providedIn: 'root'
})
export class TotpService {

  //Generation of the secret key from every user
  generateSecretKey(): string {
    return generateSecret();
  }

  //Generate the URL from the QR for Google Authenticator
  async generateQRCode(email: string, secret: string): Promise<string> {
    const otpauth = generateURI({ label: email, issuer: 'ToDo App', secret })
    return QRCode.toDataURL(otpauth)
  }

  //Verify if the code inserted by the user is correct
  async verifyToken(token: string, secret: string): Promise<boolean> {
    const result = await verify({ token, secret });
    return result.valid;
  }
}