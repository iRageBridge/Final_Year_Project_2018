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
    //Gets the current id parameter from url and passes it to findAthletes function on the service
    let url:any = this.route.snapshot.params;
    this.resultsService.findAthleteById(+url.id)
                       .subscribe(results => this.results = results)
                       //Delays trigger of chart button until after data has loaded
                       setTimeout(function(){document.getElementById("chart").click()},2000)                    
  }
  //deletes selected result from database
  deleteResult(id){
    this.resultsService.deleteResult(id)
  }
  //Loads the data chart
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