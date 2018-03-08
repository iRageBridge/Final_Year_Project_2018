import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Result } from '../../shared/model/result';
import { Athlete } from '../../shared/model/athlete';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/zip";

@Injectable()
export class ResultsService {
  constructor(private af: AngularFireDatabase) { }

  getAllResults(start,end, batch){
    return this.af.list('/results',{
      query: {
        orderByChild: 'nameLower',
        startAt: start,
        endAt: end,
      }
    })
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

  getAthleteWilks(id){
    return this.af.list('/results',{
      query: {
        orderByChild: 'id',
        equalTo: id
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

  getAthleteId(name){
    return this.af.list('/results', {
      query: {
        orderByChild: 'id',
        //once: 'name' == name
      }  
    })
  }
}
