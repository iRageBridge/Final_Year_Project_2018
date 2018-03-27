import { ResultsService } from '../shared/results/results.service';
import { ActivatedRoute, Params } from "@angular/router";
import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  loaded = false;
  results=[];
  athletes=[];
  compAthletes=[];
  show47=false;
  show52=false;
  show57=false;
  show63=false;
  show72=false;
  show84=false;
  show84Plus=false;
  show59=false;
  show66=false;
  show74=false;
  show83=false;
  show93=false;
  show105=false;
  show120=false;
  show120Plus=false;
  constructor(private route: ActivatedRoute,
              private resultsService: ResultsService) { }

  ngOnInit() {
    this.getComps();
    this.getAthletes();
    this.getResultsInComp();
    setTimeout(function(){document.getElementById("show").click()},3000)
  }
  //Shows weight class heading, only for weight classes that have results
  showResults(){
    for(let i = 0; i < this.compAthletes.length; i++){
      if(this.compAthletes[i].weight_class == 43 || this.compAthletes[i].weight_class == 47){
        this.show47 = true;
      }
      if(this.compAthletes[i].weight_class == 52){
        this.show52 = true;
      }
      if(this.compAthletes[i].weight_class == 57){
        this.show57 = true;
      }
      if(this.compAthletes[i].weight_class == 63){
        this.show63 = true;
      }
      if(this.compAthletes[i].weight_class == 72){
        this.show72 = true;
      }
      if(this.compAthletes[i].weight_class == 84){
        this.show84 = true;
      }
      if(this.compAthletes[i].weight_class == '84+'){
        this.show84Plus = true;
      }
      if(this.compAthletes[i].weight_class == 59 || this.compAthletes[i].weight_class == 53){
        this.show59 = true;
      }
      if(this.compAthletes[i].weight_class == 66){
        this.show66 = true;
      }
      if(this.compAthletes[i].weight_class == 74){
        this.show74 = true;
      }
      if(this.compAthletes[i].weight_class == 83){
        this.show83 = true;
      }
      if(this.compAthletes[i].weight_class == 93){
        this.show93 = true;
      }
      if(this.compAthletes[i].weight_class == 105){
        this.show105 = true;
      }
      if(this.compAthletes[i].weight_class == 120){
        this.show120 = true;
      }
      if(this.compAthletes[i].weight_class == '120+'){
        this.show120Plus = true;
      }
    }
  }
  //Gets all athletes that competed in the current competition
  getResultsInComp(){
    let url:any = this.route.snapshot.params;
    return this.resultsService.getResultsInComp(+url.compId)
                              .subscribe(compAthletes => this.compAthletes = compAthletes)
                              
  }
  //Gets the info of the current competition
  getComps(){
    let url:any = this.route.snapshot.params;
    this.resultsService.getCompsByCompId(+url.compId)
                       .subscribe(results => this.results = results)
                       
  }
  //Get all athlete information, to be checked vs current competition
  getAthletes(){
    this.resultsService.getAllAthletes()
                          .subscribe(athletes => this.athletes = athletes)
  }
}
