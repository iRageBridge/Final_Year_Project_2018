import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {

  public athlete: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth) {
    this.athlete = afAuth.authState;
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  login(email, password): Observable<any> {
    return Observable.fromPromise(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.athlete.map(athlete => athlete && athlete.uid !== undefined);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}