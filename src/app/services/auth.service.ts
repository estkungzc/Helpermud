import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async signIn(email, password) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      return this.router.navigate(['/dashboard']);
    } catch (err) {
      console.log(err);
    }
  }

  async signUp(displayName, email, password) {
    try {
      const credential = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.updateUser(displayName, credential.user);
      return this.router.navigate(['/signin']);
    } catch (err) {
      console.log(err);
    }
  }

  async signOut() {
    try {
      await this.afAuth.auth.signOut();
      return this.router.navigate(['/signin']);
    } catch (err) {
      console.log(err);
    }
  }

  async resetPassword(email: string) {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(email);
      console.log('email sent');
    } catch (err) {
      console.log(err);
    }
  }

  private updateUser(name, user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      name
    };

    return userRef.set(data, { merge: true });
  }
}
