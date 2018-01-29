import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Post } from '../../shared/model/result';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import { Athlete } from '../model/athlete';

@Injectable()
export class ResultsService {
  constructor(private af: AngularFireDatabase) { }


  getAllResults(query: FirebaseListFactoryOpts ={}): Observable<Post[]>{
     return this.af.list('/results', query)
      .map(Post.fromJsonList)
  }

  loadNextPage(startAt: string, limit = 20){
    return this.getAllResults({query: {
      orderByKey: true,
      limitToFirst: 20,
      startAt
    }})
  }

  loadPreviousPage(startAt: string, limit = 20){
    return this.getAllResults({query: {
      orderByKey: true,
      limitToFirst: 20,
      startAt
    }})
  }

  findPostByKey(key): Observable<Post>{
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

  findPostKeysPerAthlete(athleteKey:string,
                      query: FirebaseListFactoryOpts): Observable<string[]> {
    return this.af.list(`resultsPerAthlete/${athleteKey}`, query)
    .map(postKeysPerAthlete => postKeysPerAthlete.map(post => post.key$));
  }

  findResultsForPostKeys(postKeys$: Observable<string[]>):Observable<Post[]> {
    return postKeys$
    .map(postKeys$ => postKeys$.map(key => this.findPostByKey(key)))
    .flatMap(fbObj => Observable.combineLatest(fbObj));
  }

  getResultsByAthleteKey(athleteKey:string, limit = 20){
    const firstPagePostKeys$ = this.findPostKeysPerAthlete(athleteKey, {query: {
      limitToFirst: 3
    }});
    return this.findResultsForPostKeys(firstPagePostKeys$);
  }
}
