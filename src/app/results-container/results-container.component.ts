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
  batch = 20;
  numChecked = 0; 
  isLoggedIn;
  athletes = [];
  comparisonResults = [];
  results=[];
  resultsToCompare=[];
  athleteWilks1=[];
  athleteWilks2=[];
  athleteWilks3=[];
  athleteWilks4=[];
  athleteWilks5=[];
  athleteNames;
  datasets=[];
  chart = [];
  startAt: BehaviorSubject<string|null> = new BehaviorSubject("");
  endAt: BehaviorSubject<string|null> = new BehaviorSubject("\uf8ff");

  constructor(private modalService:NgbModal,
              private authService: AuthService,
              private resultsService: ResultsService) {

    authService.isAuthenticated()
    .subscribe(
      success => this.isLoggedIn = success,
    );
  }

  ngOnInit() {
    this.athleteNames = [];
    this.batch = 20;
    this.getAthletes();  
    //this.getResults();
    this.getComparisonResults();
  }
  //Get first 20 all athletes from database
  getAthletes(){
    this.resultsService.getAllAthletes(this.startAt, this.endAt, this.batch)
                          .subscribe(athletes => this.athletes = athletes)
  }
  //Get ALL athletes from database. Needed to combat issue of comparison names being deleted from comparison array
  getComparisonResults(){
    this.resultsService.getResults()
                       .subscribe(results =>this.comparisonResults = results)
  }

  //Load next 20 athletes
  loadMore(){
    this.batch +=20;
    this.getAthletes();
  }
  //Changes search parameters based on letters typed into search bar
  search($event) {
    const q = $event.target.value.toLowerCase()
    this.startAt.next(q);
    this.endAt.next(q+"\uf8ff");
  }
  //delete selected athlete from database
  deleteAthlete(id){
    this.resultsService.deleteAthlete(id);
  }
  //Checks to see if an athlete has been selected for comparison and adds to comparison array
  resultTicked(id,e){
    if(e.target.checked){
      this.numChecked++;
      if(this.resultsToCompare.length == 5){
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
        if(this.numChecked < 5){
          this.resultsToCompare.splice(index, 1);
        }
      }
    }
  }
  //Loads the chart into the modal window, only loads selected athletes
  getChart(){
    this.athleteWilks1 = [];
    this.athleteWilks2 = [];
    this.athleteWilks3 = [];
    this.athleteWilks4 = [];
    this.athleteWilks5 = [];
    for (let i = 0; i < this.comparisonResults.length; i++){
      if(this.comparisonResults[i].id == this.resultsToCompare[0]){
        this.athleteNames[0] = this.comparisonResults[i].name;
        this.athleteWilks1.push(this.comparisonResults[i].wilks);
      }
      if(this.comparisonResults[i].id == this.resultsToCompare[1]){
        this.athleteNames[1] = this.comparisonResults[i].name;
        this.athleteWilks2.push(this.comparisonResults[i].wilks);
      }
      if(this.comparisonResults[i].id == this.resultsToCompare[2]){
        this.athleteNames[2] = this.comparisonResults[i].name;
        this.athleteWilks3.push(this.comparisonResults[i].wilks);
      }
      if(this.comparisonResults[i].id == this.resultsToCompare[3]){
        this.athleteNames[3] = this.comparisonResults[i].name;
        this.athleteWilks4.push(this.comparisonResults[i].wilks);
      }
      if(this.comparisonResults[i].id == this.resultsToCompare[4]){
        this.athleteNames[4] = this.comparisonResults[i].name;
        this.athleteWilks5.push(this.comparisonResults[i].wilks);
      }
    }
    this.datasets.push({
      label: this.athleteNames[0],
      data: this.athleteWilks1,
      fill: false,
      lineTension:0.2,
      borderColor:"green",
      borderWidth:1
    },
    {
      label: this.athleteNames[1],
      data: this.athleteWilks2,
      fill: false,
      lineTension:0.2,
      borderColor:"blue",
      borderWidth:1
    })

    if(this.resultsToCompare.length >= 3){
      this.datasets.push(
      {
        label: this.athleteNames[2],
        data: this.athleteWilks3,
        fill:false,
        lineTension:0.2,
        borderColor:"orange",
        borderWidth:1
      })
    }
    if(this.resultsToCompare.length >= 4){
      this.datasets.push(
      {
        label: this.athleteNames[3],
        data: this.athleteWilks4,
        fill:false,
        lineTension:0.2,
        borderColor:"red",
        borderWidth:1
      })
    }
    if(this.resultsToCompare.length == 5){
      this.datasets.push(
      {
        label: this.athleteNames[4],
        data: this.athleteWilks5,
        fill:false,
        lineTension:0.2,
        borderColor:"purple",
        borderWidth:1
      })
    }
    this.chart = new Chart('canvas', {
      type: 'line',
      data:{
        labels: [1,2,3,4,5,6,7],
        datasets:this.datasets
      }
    });
  }
  //opens modal window
  openPopup(content) {
    this.modalService.open(content,{
      size:'lg',
      windowClass: 'modal-xxl'
    }).result.then(() => {}, () => { this.resultsToCompare=[]; this.datasets=[]; this.athleteNames = [];this.numChecked =0 ;this.loadMore();});
    }
  }
