import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../shared/results/results.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  public athletes = [];

  constructor(private _resultsService: ResultsService) { }

  ngOnInit() {
    this._resultsService.getAthletesByRanking(83)
                        .subscribe(athletes => this.athletes = athletes) 
  }
}
