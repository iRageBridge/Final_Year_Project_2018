import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ResultsService } from "../shared/results/results.service";
import { Result } from "../shared/model/result";
import { AuthService } from '../shared/auth/auth.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-athlete-profile',
  templateUrl: './athlete-profile.component.html',
  styleUrls: ['./athlete-profile.component.css'],
})
export class AthleteProfileComponent implements OnInit {
  private _results = [];
  private _chart = [];
  private _labels = [];
  private _athleteName;
  private _athleteWilks=[];
  private _loggedIn;

  constructor(private _route: ActivatedRoute,
              private _resultsService: ResultsService,
              private _authService: AuthService){ 
                _authService.isAuthenticated()
    .subscribe(
      success => this._loggedIn = success,
    );
  }
    
  ngOnInit() {
    let url:any = this._route.snapshot.params;
    this._resultsService.getAthleteById(+url.id)
                       .subscribe(results => this._results = results) 
                       setTimeout(function(){document.getElementById("chart").click()},2000)                    
  }
  //deletes selected result from database
  deleteResult(id){
    this._resultsService.deleteResult(id)
  }
  //Loads the data chart
  getChart(){
    this._athleteName = this._results[0].name;
    for(let i = 0; i < this._results.length; i++){
      this._athleteWilks.push(this._results[i].wilks)
      this._labels.push(this._results[i].date);
    }
    this._chart = new Chart('canvas', {
      type: 'line',
      data:{
        labels: this._labels,
        datasets:[
          {
            label: this._athleteName,
            data: this._athleteWilks,
            fill:false,
            lineTension:0.2,
            borderColor:"green",
            borderWidth:1
          }
        ]
      }
    });
  }
}