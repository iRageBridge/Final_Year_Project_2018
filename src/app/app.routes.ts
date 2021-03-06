import { Route } from "@angular/router/src/config";
import { ResultsContainerComponent } from "./results-container/results-container.component";
import { AthleteProfileComponent } from "./athlete-profile/athlete-profile.component";
import { AdminComponent } from "./admin/admin.component";
import { LoginComponent } from './login/login.component';
import { AuthService } from "./shared/auth/auth.service";
import  { CompetitionComponent } from './competition/competition.component';
import { CompetitionContainerComponent } from "./competition-container/competition-container.component";
import { RankingComponent } from "./ranking/ranking.component";
//Sets up routes, blocks admin routes for non-admins
export const ROUTES: Route[] =[{
      path: 'results', 
      children: [{
        path: '', component: ResultsContainerComponent
        },]
    },
    {
      path: 'rankings', component: RankingComponent
    },
    {
      path: 'athletes',
      children: [{
        path: ':id', component: AthleteProfileComponent
      },]
    },{
      path: 'login', component: LoginComponent
    },{
      path: 'comps', component: CompetitionContainerComponent
    },{
      path: '', redirectTo: 'results', pathMatch: 'full'
    },{
      path: 'comps', 
      children: [{
        path:':compId',component: CompetitionComponent
      },]
    },{
      path: 'admin', 
        canActivate: [ AuthService ],
        component: AdminComponent
    }
];