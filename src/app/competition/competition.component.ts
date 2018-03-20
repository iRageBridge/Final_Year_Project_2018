import { ResultsService } from '../shared/results/results.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'; 
import { ActivatedRoute, Params } from "@angular/router";
import { Result } from "../shared/model/result";
import { Component, OnInit, AfterContentInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, Inject, Input, ElementRef, NgModule } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AuthService} from '../shared/auth/auth.service';
import { Athlete } from "../shared/model/athlete";
import * as _ from 'lodash'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  results=[];
  athletes=[];
  currentComp;
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
  /*for(let i=0; i < this.results.length; i++){
      if(this.results[i].compId == +url.compId){
        console.log("test");
      }
    }*/
  }

  getAthletes(){
    this.resultsService.getCompAthletes()
                          .subscribe(athletes => this.athletes = athletes)
  }
}
