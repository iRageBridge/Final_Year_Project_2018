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
  constructor(private _af: AngularFireDatabase) { }
  //Gets all results
  getAllResults(){
    return this._af.list('/results');
  }
  //Gets all competitions
  getAllComps(){
    return this._af.list('/comps',{
      query: {
        orderByChild: 'compId'
      }
    })
  }
  //Gets competitions based on competition id
  getCompsByCompId(id){
    return this._af.list('/results',{
      query: {
        orderByChild: 'compId',
        equalTo: id
      }
    })
  }
  //Gets all athletes
  getAllAthletes(){
    return this._af.list('/athletes')
  }
  //return rankings for passed in weight class
  getAthletesByRanking(wClass){
    alert(wClass)
    return this._af.list('/athletes',{
      query:{
        orderByChild: 'weight_class',
        equalTo: wClass
      }
    })
  }
  //Gets all athletes in a certain competition
  getResultsInComp(comp){
    return this._af.list('/results',{
      query:{
        orderByChild: 'compId',
        equalTo: comp
      }
    })
  }
  //Gets athletes based on search parameters.
  getAthletesBySearch(start,end, batch){
    return this._af.list('/athletes',{
      query: {
        orderByChild: 'nameLower',
        limitToFirst: batch,
        startAt: start,
        endAt: end,
      }
    })
  }
  //Get all athletes with a certain id
  getAthleteById(uid){
    return this._af.list('/results',{
      query: {
        orderByChild: "id",
        equalTo: uid
      }
    })
  }
  //delete selected result
  deleteResult(id){
    this._af.object(`results/${id}`)
    .remove()
    .then(() => alert("Result deleted"));
  }
  //delete selected athlete
  deleteAthlete(id){
    this._af.object(`athletes/${id}`)
    .remove()
    .then(() => alert("Athlete Deleted"));
  }
  //delete selected competition
  deleteComp(id){
    this._af.object(`comps/${id}`)
    .remove()
    .then(()=> alert("Competition Deleted"))
  }
}