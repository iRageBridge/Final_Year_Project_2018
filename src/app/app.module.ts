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
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { AdminComponent } from './admin/admin.component';
import { Angular2TokenService } from  'angular2-token';
import { UploadService } from './shared/upload/upload.service';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Chart from 'chart.js';
import { CompetitionComponent } from './competition/competition.component';
import { CompetitionContainerComponent } from './competition-container/competition-container.component';
import { RankingComponent } from './ranking/ranking.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultsContainerComponent,
    NavigationComponent,
    AthleteProfileComponent,
    LoginComponent,
    AdminComponent,
    CompetitionComponent,
    CompetitionContainerComponent,
    RankingComponent
  ],
  entryComponents: [ResultsContainerComponent],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ResultsService, AuthService, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }