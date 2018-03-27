import { ResultsService } from '../shared/results/results.service';
import { ActivatedRoute, Params } from "@angular/router";
import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-competition-container',
  templateUrl: './competition-container.component.html',
  styleUrls: ['./competition-container.component.css']
})
export class CompetitionContainerComponent implements OnInit {
  results=[];
  constructor(private route: ActivatedRoute,
              private resultsService: ResultsService) { }

  ngOnInit() {
    this.getAllComps();
  }

  getAllComps(){
    this.resultsService.getAllComps()
                       .subscribe(results => this.results = results)
  }

  deleteComp(id){
    this.resultsService.deleteComp(id)
  }
}
