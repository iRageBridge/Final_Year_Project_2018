import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Athlete} from "../shared/model/athlete";
import {ResultsService} from "../shared/results/results.service";
import {Result} from "../shared/model/result";

@Component({
  selector: 'app-athlete-profile',
  templateUrl: './athlete-profile.component.html',
  styleUrls: ['./athlete-profile.component.css'],
})
export class AthleteProfileComponent implements OnInit {
  public athlete$: Observable<Athlete>;
  constructor(private route: ActivatedRoute,
              private resultsService: ResultsService){}

  ngOnInit() {
   this.athlete$ = this.route.params
      .switchMap(params => this.resultsService.findAthleteByAthletename(params['athletes']))
      .publishReplay().refCount();
    
    this.route.params.subscribe((params: Params) => {
        let name = params['name'];
        console.log(name);
      });
  }
}