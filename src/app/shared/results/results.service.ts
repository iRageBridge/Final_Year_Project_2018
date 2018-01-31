import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Result } from '../../shared/model/result';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import { Athlete } from '../model/athlete';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/zip";

@Injectable()
export class ResultsService {
  constructor(private af: AngularFireDatabase) { }
  
  /*getAllResults(query: FirebaseListFactoryOpts ={}): Observable<Result[]>{
     return this.af.list('/results', query)
      .map(Result.fromJsonList)
  }*/

  getAllResults(start,end):FirebaseListObservable<any>{
    return this.af.list('/results',{
      query: {
        orderByChild: 'name',
        startAt: start,
        endAt: end
      }
    });
  }

  findResultByKey(key): Observable<Result>{
    return this.af.object(`/results/${key}`);
  }

  findAthleteByAthletename(athletename: string):Observable<Athlete>{
    return this.af.list('athletes', {
      query: {
        orderByChild: 'name',
        equalTo: athletename
      }
    }).map(res=>Athlete.fromArray(res[0]))
      .do(athlete=>console.log('athlete: ', athlete));
  }

  findResultKeysPerAthlete(athleteKey:string,
                      query: FirebaseListFactoryOpts): Observable<string[]> {
    return this.af.list(`resultsPerAthlete/${athleteKey}`, query)
    .map(postKeysPerAthlete => postKeysPerAthlete.map(post => post.key$));
  }

  findResultsForResultKeys(postKeys$: Observable<string[]>):Observable<Result[]> {
    return postKeys$
    .map(postKeys$ => postKeys$.map(key => this.findResultByKey(key)))
    .flatMap(fbObj => Observable.combineLatest(fbObj));
  }

  getResultsByAthleteKey(athleteKey:string, limit = 20){
    const firstPageResultKeys$ = this.findResultKeysPerAthlete(athleteKey, {query: {
      limitToFirst: 3
    }});
    return this.findResultsForResultKeys(firstPageResultKeys$);
  }
}
