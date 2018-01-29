import { Component, OnInit, AfterContentInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { SinglePostComponent } from './single-result/single-result.component';
import { ResultsService } from '../shared/results/results.service';

@Component({
  selector: 'app-results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.css']
})
export class ResultsContainerComponent implements OnInit {

  private resultsLimit = 20;
  results$;
  constructor(private postService: ResultsService) { }

  ngOnInit() {
    this.results$ = this.postService.getAllResults({query: {
      limitToFirst: this.resultsLimit
    }})
      .publishReplay().refCount();
  }

  nextResults(){
    this.results$ = this.results$.switchMap(results => {
      const startAt = results[results.length-1].$key;
      return this.postService.loadNextPage(startAt, this.resultsLimit);
    });
  }

  prevResults(){
    this.results$ = this.results$.switchMap(results => {
      const startAt = results[0].$key;
      return this.postService.loadPreviousPage(startAt, this.resultsLimit);
    });
  }
}
