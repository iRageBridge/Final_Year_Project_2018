import { Injectable } from '@angular/core';
import {ResultsService} from "./results.service";
import {Observable} from "rxjs/Observable";
import { Result } from "../model/result";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

/*
const INIT_POST = {
  $key: undefined,
  post_title: undefined,
  post_body: undefined,
  date: undefined,
  athlete: undefined
};
*/

const INIT_POST = {
  $key: undefined,
  bench: undefined,
  bodyweight: undefined,
  w_class: undefined,
  comp: undefined,
  deadlift: undefined,
  gender: undefined,
  id: undefined,
  location: undefined,
  name: undefined,
  place: undefined,
  raw_eq: undefined,
  squat: undefined,
  total: undefined,
  weight_class: undefined,
  wilks: undefined,
  year: undefined
};

@Injectable()
export class ResultsPaginationService {

  private resultsLimit = 3;
  private athleteKey: string;
  private lastResultKey: string;
  private firstResultKey: string;

  private resultsSubject = new BehaviorSubject([INIT_POST]);
  public results$: Observable<Result[]> = this.resultsSubject.asObservable();

  constructor(private resultsService: ResultsService) { }
}

