import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ResultsService } from "../shared/results/results.service";
import { Result } from "../shared/model/result";

@Component({
  selector: 'app-athlete-profile',
  templateUrl: './athlete-profile.component.html',
  styleUrls: ['./athlete-profile.component.css'],
})
export class AthleteProfileComponent implements OnInit {
  public filter:string = 'id';
  public results = [];
  constructor(private route: ActivatedRoute,
              private resultsService: ResultsService){}

  ngOnInit() {
    let url:any = this.route.snapshot.params;
    this.resultsService.findAthleteById(+url.id, this.filter)
                       .subscribe(results => this.results = results)
                       
  }

  changeFilter(){
    //this.filter = 'competition';
  }
}