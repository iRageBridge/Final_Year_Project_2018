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

  public form: FormGroup;
  public athlete$ = this.authService.admin;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
  //Checks credentials, logs in if valid, error message if not.
  login() {
    const inputValue = this.form.value;
    this.authService.login(inputValue.email, inputValue.password)
      .subscribe(
        success => this.router.navigate(['/admin']),
        error => alert(error)
      );
  }
}