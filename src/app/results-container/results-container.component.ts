import { Component, OnInit, AfterContentInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, Inject, Input, ElementRef, NgModule } from '@angular/core';
import { ResultsService } from '../shared/results/results.service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'; 
import { AuthService} from '../shared/auth/auth.service';
import { Result } from "../shared/model/result";
import { Athlete } from "../shared/model/athlete";
import * as _ from 'lodash'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.css']
})

export class ResultsContainerComponent implements OnInit {
  private _status;
  private _batch = 20;
  public numChecked = 0; 
  public isLoggedIn;
  public athletes = [];
  private _comparisonResults = [];
  private _resultsToCompare=[];
  private _athleteWilks1=[];
  private _athleteWilks2=[];
  private _athleteWilks3=[];
  private _athleteWilks4=[];
  private _athleteWilks5=[];
  private _athleteNames;
  private _datasets=[];
  private _chart = [];
  private _startAt: BehaviorSubject<string|null> = new BehaviorSubject("");
  private _endAt: BehaviorSubject<string|null> = new BehaviorSubject("\uf8ff");

  constructor(private _modalService:NgbModal,
              private _authService: AuthService,
              private _resultsService: ResultsService) {

    _authService.isAuthenticated()
    .subscribe(
      success => this.isLoggedIn = success,
    );
  }

  ngOnInit() {
    this._status="Loading Athletes..."
    this._athleteNames = [];
    this._batch = 20;
    this.getAthletes();  
    this.getComparisonResults();
  }
  //Get first 20 all athletes from database
  getAthletes(){
    this._resultsService.getAthletesBySearch(this._startAt, this._endAt, this._batch)
                          .subscribe(athletes => this.athletes = athletes)

  }
  //Get ALL athletes from database. Needed to combat issue of comparison names being deleted from comparison array
  getComparisonResults(){
    this._resultsService.getAllResults()
                       .subscribe(results =>this._comparisonResults = results)
  }

  loadMore(){
    this._batch +=20;
    this.getAthletes();
  }
  //Changes search parameters based on letters typed into search bar
  search($event) {
    this._status="No Athletes Found"
    const q = $event.target.value.toLowerCase()
    this._startAt.next(q);
    this._endAt.next(q+"\uf8ff");
  }
  //delete selected athlete from database
  deleteAthlete(id){
    this._resultsService.deleteAthlete(id);
  }
  //Checks to see if an athlete has been selected for comparison and adds to comparison array
  resultTicked(id,e){
    if(e.target.checked){
      this.numChecked++;
      if(this._resultsToCompare.length == 5){
        this._resultsToCompare.shift();
        this._resultsToCompare.push(id);
      }
      else{
        this._resultsToCompare.push(id);
      }
    }
    else{
      this.numChecked--;
      let index = this._resultsToCompare.indexOf(id);
      if (index != -1){
        if(this.numChecked < 5){
          this._resultsToCompare.splice(index, 1);
        }
      }
    }
  }
  //Loads the chart into the modal window, only loads selected athletes
  getChart(){
    this._athleteWilks1 = [];
    this._athleteWilks2 = [];
    this._athleteWilks3 = [];
    this._athleteWilks4 = [];
    this._athleteWilks5 = [];
    for (let i = 0; i < this._comparisonResults.length; i++){
      if(this._comparisonResults[i].id == this._resultsToCompare[0]){
        this._athleteNames[0] = this._comparisonResults[i].name;
        this._athleteWilks1.push(this._comparisonResults[i].wilks);
      }
      if(this._comparisonResults[i].id == this._resultsToCompare[1]){
        this._athleteNames[1] = this._comparisonResults[i].name;
        this._athleteWilks2.push(this._comparisonResults[i].wilks);
      }
      if(this._comparisonResults[i].id == this._resultsToCompare[2]){
        this._athleteNames[2] = this._comparisonResults[i].name;
        this._athleteWilks3.push(this._comparisonResults[i].wilks);
      }
      if(this._comparisonResults[i].id == this._resultsToCompare[3]){
        this._athleteNames[3] = this._comparisonResults[i].name;
        this._athleteWilks4.push(this._comparisonResults[i].wilks);
      }
      if(this._comparisonResults[i].id == this._resultsToCompare[4]){
        this._athleteNames[4] = this._comparisonResults[i].name;
        this._athleteWilks5.push(this._comparisonResults[i].wilks);
      }
    }
    this._datasets.push({
      label: this._athleteNames[0],
      data: this._athleteWilks1,
      fill: false,
      lineTension:0.2,
      borderColor:"green",
      borderWidth:1
    },
    {
      label: this._athleteNames[1],
      data: this._athleteWilks2,
      fill: false,
      lineTension:0.2,
      borderColor:"blue",
      borderWidth:1
    })

    if(this._resultsToCompare.length >= 3){
      this._datasets.push(
      {
        label: this._athleteNames[2],
        data: this._athleteWilks3,
        fill:false,
        lineTension:0.2,
        borderColor:"orange",
        borderWidth:1
      })
    }
    if(this._resultsToCompare.length >= 4){
      this._datasets.push(
      {
        label: this._athleteNames[3],
        data: this._athleteWilks4,
        fill:false,
        lineTension:0.2,
        borderColor:"red",
        borderWidth:1
      })
    }
    if(this._resultsToCompare.length == 5){
      this._datasets.push(
      {
        label: this._athleteNames[4],
        data: this._athleteWilks5,
        fill:false,
        lineTension:0.2,
        borderColor:"purple",
        borderWidth:1
      })
    }
    this._chart = new Chart('canvas', {
      type: 'line',
      data:{
        labels: [1,2,3,4,5,6,7],
        datasets:this._datasets
      }
    });
  }
  //opens modal window
  openPopup(content) {
    this._modalService.open(content,{
      size:'lg',
      windowClass: 'modal-xxl'
    }).result.then(() => {}, () => { this._resultsToCompare=[]; this._datasets=[]; this._athleteNames = [];this.numChecked =0 ;this.loadMore();});
    }
  }
