import { ResultsService } from '../shared/results/results.service';
import { ActivatedRoute, Params } from "@angular/router";
import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  private _loaded = false;
  private _results=[];
  private _athletes=[];
  private _compAthletes=[];
  private _show47=false;
  private _show52=false;
  private _show57=false;
  private _show63=false;
  private _show72=false;
  private _show84=false;
  private _show84Plus=false;
  private _show59=false;
  private _show66=false;
  private _show74=false;
  private _show83=false;
  private _show93=false;
  private _show105=false;
  private _show120=false;
  private _show120Plus=false;
  constructor(private _route: ActivatedRoute,
              private _resultsService: ResultsService) { }

  ngOnInit() {
    this.getAllComps();
    this.getAthletes();
    this.getAthletesInComp();
    setTimeout(function(){document.getElementById("show").click()},3000)
  }

  showResults(){
    for(let i = 0; i < this._compAthletes.length; i++){
      if(this._compAthletes[i].weight_class == 43 || this._compAthletes[i].weight_class == 47){
        this._show47 = true;
      }
      if(this._compAthletes[i].weight_class == 52){
        this._show52 = true;
      }
      if(this._compAthletes[i].weight_class == 57){
        this._show57 = true;
      }
      if(this._compAthletes[i].weight_class == 63){
        this._show63 = true;
      }
      if(this._compAthletes[i].weight_class == 72){
        this._show72 = true;
      }
      if(this._compAthletes[i].weight_class == 84){
        this._show84 = true;
      }
      if(this._compAthletes[i].weight_class == '84+'){
        this._show84Plus = true;
      }
      if(this._compAthletes[i].weight_class == 59 || this._compAthletes[i].weight_class == 53){
        this._show59 = true;
      }
      if(this._compAthletes[i].weight_class == 66){
        this._show66 = true;
      }
      if(this._compAthletes[i].weight_class == 74){
        this._show74 = true;
      }
      if(this._compAthletes[i].weight_class == 83){
        this._show83 = true;
      }
      if(this._compAthletes[i].weight_class == 93){
        this._show93 = true;
      }
      if(this._compAthletes[i].weight_class == 105){
        this._show105 = true;
      }
      if(this._compAthletes[i].weight_class == 120){
        this._show120 = true;
      }
      if(this._compAthletes[i].weight_class == '120+'){
        this._show120Plus = true;
      }
    }
  }

  getAthletesInComp(){
    let url:any = this._route.snapshot.params;
    return this._resultsService.getResultsInComp(+url.compId)
                              .subscribe(compAthletes => this._compAthletes = compAthletes)
                              
  }

  getAllComps(){
    let url:any = this._route.snapshot.params;
    this._resultsService.getCompsByCompId(+url.compId)
                       .subscribe(results => this._results = results)
                       
  }

  getAthletes(){
    this._resultsService.getAllAthletes()
                          .subscribe(athletes => this._athletes = athletes)
  }
}
