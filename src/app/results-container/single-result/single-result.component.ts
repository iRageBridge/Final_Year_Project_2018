import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../shared/model/result';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-result.component.html',
  styleUrls: ['./single-result.component.css']
})
export class SinglePostComponent implements OnInit {

  @Input() resultsList: Post[];
  constructor() { }

  ngOnInit() {
  }
}
