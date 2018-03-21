import { ResultsService } from '../shared/results/results.service';
import { ActivatedRoute, Params } from "@angular/router";
import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  results=[];
  athletes=[];
  constructor(private route: ActivatedRoute,
              private resultsService: ResultsService) { }

  ngOnInit() {
    this.getAllComps();
    this.getAthletes();
  }

  getAllComps(){
    let url:any = this.route.snapshot.params;
    this.resultsService.getComps(+url.compId)
                       .subscribe(results => this.results = results)
  }

  getAthletes(){
    this.resultsService.getCompAthletes()
                          .subscribe(athletes => this.athletes = athletes)
  }
}
