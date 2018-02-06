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
  finished = false;

  public isLoggedIn;
  results = [];
  startAt: BehaviorSubject<string|null> = new BehaviorSubject("");
  endAt: BehaviorSubject<string|null> = new BehaviorSubject("\uf8ff");
  
  constructor(private authService: AuthService, private resultsService: ResultsService) {
    authService.isAuthenticated()
    .subscribe(
      success => this.isLoggedIn = success,
    );
  }

  ngOnInit() {
    this.batch = 20;
    this.getResults();  
  }

  getResults(){
    this.resultsService.getAllResults(this.startAt, this.endAt, this.batch)
                          .subscribe(results => this.results = results)
  }

  loadMore(){
    this.batch +=20;
    this.getResults();
  }

  search($event) {
    const q = $event.target.value.toLowerCase()
    this.startAt.next(q);
    this.endAt.next(q+"\uf8ff");
  }
}
