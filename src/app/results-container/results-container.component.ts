import { Component, OnInit, AfterContentInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { ResultsService } from '../shared/results/results.service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService} from '../shared/auth/auth.service';
import { Result } from "../shared/model/result";
import { Athlete } from "../shared/model/athlete";
import * as _ from 'lodash'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.css']
})
export class ResultsContainerComponent implements OnInit {
  batch = 20;
  finished = false;
  closeResult:string;
  numChecked = 0;

  public isLoggedIn;
  athletes = [];
  results=[];
  resultsToCompare=[];

  startAt: BehaviorSubject<string|null> = new BehaviorSubject("");
  endAt: BehaviorSubject<string|null> = new BehaviorSubject("\uf8ff");
  
  constructor(private modalService:NgbModal, private authService: AuthService, private resultsService: ResultsService) {
    authService.isAuthenticated()
    .subscribe(
      success => this.isLoggedIn = success,
    );
  }

  ngOnInit() {
    this.batch = 20;
    this.getAthletes();  
    this.getResults();
  }

  resetBoxes(){
    this.athletes.forEach((item) => {
      item.checked = false;
    })
  }

  getAthletes(){
    this.resultsService.getAllAthletes(this.startAt, this.endAt, this.batch)
                          .subscribe(athletes => this.athletes = athletes)
  }

  getResults(){
    this.resultsService.getAllResults(this.startAt, this.endAt, this.batch)
                          .subscribe(results => this.results = results)
  }

  loadMore(){
    this.batch +=20;
    this.getAthletes();
  }

  search($event) {
    const q = $event.target.value.toLowerCase()
    this.startAt.next(q);
    this.endAt.next(q+"\uf8ff");
  }

  resultTicked(id,e){
    if(e.target.checked){
      this.numChecked++;
      if(this.resultsToCompare.length == 2){
        this.resultsToCompare.shift();
        this.resultsToCompare.push(id);
      }
      else{
        this.resultsToCompare.push(id);
      }
    }
    else{
      this.numChecked--;
      let index = this.resultsToCompare.indexOf(id);
      if (index != -1){
        if(this.numChecked < 2){
          this.resultsToCompare.splice(index, 1);
        }
      }
    }
    console.log(this.resultsToCompare);
    console.log("resultToCompare: "+this.resultsToCompare.length)
  }

  openPopup(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
