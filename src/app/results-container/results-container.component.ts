import { Component, OnInit, AfterContentInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { SingleResultComponent } from './single-result/single-result.component';
import { ResultsService } from '../shared/results/results.service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.css']
})
export class ResultsContainerComponent implements OnInit {
  
  athletes;
  startAt: BehaviorSubject<string|null> = new BehaviorSubject("");
  endAt: BehaviorSubject<string|null> = new BehaviorSubject("\uf8ff");

  lastKeypress: number = 0;

  private resultsLimit = 20;
  results$;
  constructor(private resultsService: ResultsService) { }

  ngOnInit() {
    /*this.results$ = this.resultsService.getAllResults()
      .publishReplay().refCount();*/
      
      this.resultsService.getAllResults(this.startAt, this.endAt)
                          .subscribe(results => this.athletes = results)
  }

  search($event){
    if($event.timeStamp - this.lastKeypress > 200){
      let q = $event.target.value
      this.startAt.next(q)
      this.endAt.next(q+"\uf8ff")
    }
    this.lastKeypress = $event.timeStamp
  }
}
