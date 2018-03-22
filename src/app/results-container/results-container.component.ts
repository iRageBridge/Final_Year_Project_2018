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
  styleUrls: ['./results-container.component.less']
})

export class ResultsContainerComponent implements OnInit {
  batch = 20;
  numChecked = 0; 
  isLoggedIn;
  athletes = [];
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
    this.getResults();
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

  deleteAthlete(id){
    this.resultsService.deleteAthlete(id);
  }

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

  getChart(){
    this.athleteWilks1 = [];
    this.athleteWilks2 = [];
    this.athleteWilks3 = [];
    this.athleteWilks4 = [];
    this.athleteWilks5 = [];
    for (let i = 0; i < this.results.length; i++){
      if(this.results[i].id == this.resultsToCompare[0]){
        this.athleteNames[0] = this.results[i].name;
        this.athleteWilks1.push(this.results[i].wilks);
      }
      if(this.results[i].id == this.resultsToCompare[1]){
        this.athleteNames[1] = this.results[i].name;
        this.athleteWilks2.push(this.results[i].wilks);
      }
      if(this.results[i].id == this.resultsToCompare[2]){
        this.athleteNames[2] = this.results[i].name;
        this.athleteWilks3.push(this.results[i].wilks);
      }
      if(this.results[i].id == this.resultsToCompare[3]){
        this.athleteNames[3] = this.results[i].name;
        this.athleteWilks4.push(this.results[i].wilks);
      }
      if(this.results[i].id == this.resultsToCompare[4]){
        this.athleteNames[4] = this.results[i].name;
        this.athleteWilks5.push(this.results[i].wilks);
      }
    }
    console.log(this.athleteNames)
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

  openPopup(content) {
    console.log(this.datasets.length)
    this.modalService.open(content,{
      size:'lg',
      windowClass: 'modal-xxl'
    }).result.then(() => { console.log('When user closes'); }, () => { this.resultsToCompare=[]; this.datasets=[]; this.athleteNames = [];this.numChecked =0 ;this.loadMore();});
    }
  }
