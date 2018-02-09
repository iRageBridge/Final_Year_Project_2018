import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ResultsContainerComponent } from './results-container/results-container.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ResultsService } from './shared/results/results.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { RouterModule } from "@angular/router";
import { ROUTES } from "./app.routes";
import { AthleteProfileComponent } from './athlete-profile/athlete-profile.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from "./shared/auth/auth.service";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { AdminComponent } from './admin/admin.component';
import { Angular2TokenService } from  'angular2-token';

@NgModule({
  declarations: [
    AppComponent,
    ResultsContainerComponent,
    NavigationComponent,
    AthleteProfileComponent,
    LoginComponent,
    AdminComponent
  ],
  entryComponents: [ResultsContainerComponent],
  imports: [
    InfiniteScrollModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [ResultsService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }