import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Result } from '../../shared/model/result';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/zip";

@Injectable()
export class ResultsService {
  constructor(private af: AngularFireDatabase) { }

  getAllResults(start,end):FirebaseListObservable<any>{
    return this.af.list('/results',{
      query: {
        orderByChild: 'name',
        startAt: start,
        endAt: end,
      }
    })
  }

  findAthleteById(uid):FirebaseListObservable<any>{
    return this.af.list('/results',{
      query: {
        orderByChild: 'id',
        equalTo: uid
      }
    })
  }
}
