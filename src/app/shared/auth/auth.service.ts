import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';
import {Observable} from "rxjs/Observable";
import { CanActivate } from '@angular/router/src/interfaces';
import {Router} from "@angular/router";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';

@Injectable()
export class AuthService implements CanActivate{

  public admin: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth,
              private router: Router) {
    this.admin = afAuth.authState;
  }
  
  login(email, password): Observable<any> {
    return Observable.fromPromise(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
    );
  }

  isAuthenticated(): Observable<boolean>{
    return this.admin.map(admin => admin && admin.uid !== undefined);
  }

  canActivate():Observable<boolean> | boolean{
    let isAuth = this.isAuthenticated();
    if(!isAuth){
      alert("You must be an admin to view this page!");
      this.router.navigate(['/login']);
      return false;
    }
    return isAuth;
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}