import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';
import {Observable} from "rxjs/Observable";
import { CanActivate } from '@angular/router/src/interfaces';
import {Router} from "@angular/router";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

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

  canActivate():Observable<boolean>{
    return this.admin
      .take (1)
      .map(authState => !!authState)
      .do(authenticated => {
        if(!authenticated) {
          alert("You need to be an admin to view this page!");
          this.router.navigate(['login'])
        }
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}