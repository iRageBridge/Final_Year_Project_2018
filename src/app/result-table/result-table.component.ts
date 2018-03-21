import { ResultsService } from '../shared/results/results.service';
import { ActivatedRoute, Params } from "@angular/router";
import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {
  results = [];
  constructor(private route: ActivatedRoute,
              private resultsService: ResultsService) { }

  ngOnInit() {
    this.getAllResults();
  }

  getAllResults(){
    let url:any = this.route.snapshot.params;
    this.resultsService.getComps(+url.compId)
                       .subscribe(results => this.results = results)
  }

}
