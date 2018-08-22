import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../shared/results/results.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  public athletes = [];
  public input = 59;
  constructor(private _resultsService: ResultsService) { }

  ngOnInit() {
    this.getRankings(this.input);
  }

  getRankings(arg){
    this._resultsService.getAthletesByRanking(arg)
                        .subscribe(athletes => this.athletes = athletes) 
  }

  selectchange(args){ 
    this.input = args.target.value; 
    this.getRankings(this.input);
  } 
}
