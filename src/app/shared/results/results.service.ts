import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Result } from '../../shared/model/result';
import { Comp } from '../../shared/model/comp';
import { Athlete } from '../../shared/model/athlete';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/zip";

@Injectable()
export class ResultsService {
  constructor(private af: AngularFireDatabase) { }

  getAllResults(start,end, batch?){
    return this.af.list('/results',{
      query: {
        orderByChild: 'nameLower',
        startAt: start,
        endAt: end,
      }
    })
  }

  getResults(){
    console.log(this.af.list('/results'));
    return this.af.list('/results');
  }

  getAllComps(){
    return this.af.list('/comps',{
      query: {
        orderByChild: 'compId'
      }
    })
  }

  getComps(id){
    return this.af.list('/results',{
      query: {
        orderByChild: 'compId',
        equalTo: id
      }
    })
  }

  getCompAthletes(){
    return this.af.list('/athletes')
  }

  getAllAthletes(start,end, batch){
    return this.af.list('/athletes',{
      query: {
        orderByChild: 'nameLower',
        limitToFirst: batch,
        startAt: start,
        endAt: end,
      }
    })
  }

  findAthleteById(uid){
    return this.af.list('/results',{
      query: {
        orderByChild: "id",
        equalTo: uid
      }
    })
  }

  deleteResult(id){
    this.af.object(`results/${id}`)
    .remove()
    .then(() => alert("Result deleted"));
  }

  deleteAthlete(id){
    this.af.object(`athletes/${id}`)
    .remove()
    .then(() => alert("Athlete Deleted"));
  }
}
