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

  getAllResults(start,end, batch,/* lastKey?*/){
    console.log(batch)
      let query =  {
        orderByChild: 'name',
        //orderByKey: true,
        limitToFirst: batch,
        startAt: start,
        endAt: end,
      }
      //if(lastKey) query['startAt'] = lastKey
      return this.af.list('/results',{
        query
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
