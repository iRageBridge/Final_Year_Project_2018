import { ResultsService } from '../shared/results/results.service';
import { ActivatedRoute, Params } from "@angular/router";
import { Component, OnInit, NgModule } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-competition-container',
  templateUrl: './competition-container.component.html',
  styleUrls: ['./competition-container.component.css']
})
export class CompetitionContainerComponent implements OnInit {
  private _results=[];
  private _loggedIn;
  constructor(private _route: ActivatedRoute,
              private _resultsService: ResultsService,
              private _authService: AuthService) {
                _authService.isAuthenticated()
    .subscribe(
      success => this._loggedIn = success,
    );
               }

  ngOnInit() {
    this.getAllComps();
  }
  //Get all competitions from database
  getAllComps(){
    this._resultsService.getAllComps()
                       .subscribe(results => this._results = results)
  }
  //Delete selected competition from database
  deleteComp(id){
    this._resultsService.deleteComp(id)
  }
}
