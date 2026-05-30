import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, authState } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';

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
}
