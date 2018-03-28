import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService} from '../shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public loggedIn;
  constructor(private _authService: AuthService, private _router: Router) {
    _authService.isAuthenticated()
      .subscribe(
        success => this.loggedIn = success,
        error => this._router.navigate['/login']
      );
  }
  //Logs user out on button click
  logout(){
    let url = this._router.url
    this._authService.logout();
  }

  ngOnInit() {
  }
}
