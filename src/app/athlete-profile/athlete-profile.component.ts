import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ResultsService } from "../shared/results/results.service";
import { Result } from "../shared/model/result";
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-athlete-profile',
  templateUrl: './athlete-profile.component.html',
  styleUrls: ['./athlete-profile.component.css'],
})
export class AthleteProfileComponent implements OnInit {
  public results = [];
  loggedIn;
  constructor(private route: ActivatedRoute,
              private resultsService: ResultsService,
              private authService: AuthService){ 
                authService.isAuthenticated()
    .subscribe(
      success => this.loggedIn = success,
    );
              }
    
  ngOnInit() {
    let url:any = this.route.snapshot.params;
    this.resultsService.findAthleteById(+url.id)
                       .subscribe(results => this.results = results)                       
  }

  deleteResult(id){
    //alert(id)
    this.resultsService.deleteResult(id)
  }
}