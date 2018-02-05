import { Component, OnInit, AfterContentInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ResultsService } from '../shared/results/results.service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService} from '../shared/auth/auth.service';
import { Result } from "../shared/model/result";
import * as _ from 'lodash'

@Component({
  selector: 'app-results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.css']
})
export class ResultsContainerComponent implements OnInit {
  
  batch = 20;
  lastKey = '';
  finished = false;

  public isLoggedIn;
  results = [] //new BehaviorSubject([]);
  startAt: BehaviorSubject<string|null> = new BehaviorSubject("");
  endAt: BehaviorSubject<string|null> = new BehaviorSubject("\uf8ff");
  
  lastKeypress: number = 0;

  constructor(private authService: AuthService, private resultsService: ResultsService) {
    authService.isAuthenticated()
    .subscribe(
      success => this.isLoggedIn = success,
    );
  }

  ngOnInit() {
    //this.getResults();
      this.resultsService.getAllResults(this.startAt, this.endAt)
                          .subscribe(results => this.results = results)
  }

  /*onScroll(){
    this.getResults()
  }

  private getResults(key?){
    if (this.finished) return
    this.resultsService
      .getAllResults(this.startAt, this.endAt, this.batch+1, this.lastKey)
      .do(results =>{
        this.lastKey = _.last(results)[66]
        const newResults = _.slice(results, 0, this.batch)
        const currentResults = this.results.getValue()
        if(this.lastKey == _.last(newResults)['55']){
          this.finished = true
        }
        this.results.next(_.concat(currentResults, newResults))
      })
      .take(1)
      .subscribe(results => this.results = results)
  }*/

  search($event) {
    const q = $event.target.value
    this.startAt.next(q)
    this.endAt.next(q+"\uf8ff")
  }
}
