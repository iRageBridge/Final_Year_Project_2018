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
  results = [];
  chart = [];
  labels = [];
  athleteName;
  athleteWilks=[];
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
                       setTimeout(function(){document.getElementById("chart").click()},2000)                    
  }

  deleteResult(id){
    this.resultsService.deleteResult(id)
  }

  getChart(){
    this.athleteName = this.results[0].name;
    for(let i = 0; i < this.results.length; i++){
      this.athleteWilks.push(this.results[i].wilks)
      this.labels.push(this.results[i].date);
    }
    this.chart = new Chart('canvas', {
      type: 'line',
      data:{
        labels: this.labels,
        datasets:[
          {
            label: this.athleteName,
            data: this.athleteWilks,
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