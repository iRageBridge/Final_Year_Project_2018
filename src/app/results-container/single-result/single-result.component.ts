import { Component, OnInit, Input } from '@angular/core';
import { Result } from '../../shared/model/result';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-result.component.html',
  styleUrls: ['./single-result.component.css']
})
export class SingleResultComponent implements OnInit {

  @Input() resultsList: Result[];
  constructor() { }

  ngOnInit() {
  }
}
