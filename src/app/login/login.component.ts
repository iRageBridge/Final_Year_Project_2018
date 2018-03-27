import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private form: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _authService: AuthService,
              private _router: Router) {
    this.form = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    const inputValue = this.form.value;

    this._authService.login(inputValue.email, inputValue.password)
      .subscribe(
        success => this._router.navigate(['/']),
        error => alert(error)
      );
  }
}