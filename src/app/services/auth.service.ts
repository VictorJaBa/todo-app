import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, authState } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth)

  //Converts the observable authState to a Signal
  currentUser = toSignal(authState(this.auth))

  //Login with email & password
  loginWithEmail(email: string, password: string) {
    //use of signInWithEmailAndPassword
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  //Register with email & password
  register(email: string, password: string) {
    //use of createUserWithEmailAndPassword
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  //Login with Google
  loginWithGoogle() {
    //use of signInWithPopup with GoogleAuthProvider
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  //Logout
  logout() {
    //use of signOut
    return signOut(this.auth)
  }

  //Add in the class:
  private firestore = inject(Firestore)

  //Save the secret TOTP from the user
  async saveTotpSecret(uid: string, secret: string): Promise<void> {
    await setDoc(doc(this.firestore, 'users', uid), {
      totpSecret: secret,
      totpEnabled: true
    }, { merge: true })
  }

  //Get the secret TOPT from the user
  async getTotpSecret(uid: string): Promise<string | null> {
    const docSnap = await getDoc(doc(this.firestore, 'users', uid))
    return docSnap.exists() ? docSnap.data()['totpSecret'] : null
  }

  //Verify if the user has 2FA enable
  async hasTotpEnabled(uid: string): Promise<boolean> {
    const docSnap = await getDoc(doc(this.firestore, 'users', uid))
    return docSnap.exists() ? docSnap.data()['totpEnable'] === true : false
  }
}
