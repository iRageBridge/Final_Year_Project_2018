import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  results:FirebaseListObservable<any[]>;
  key = '1334';
  constructor(private af: AngularFireDatabase) {
    this.results = this.af.list('/results');
    //console.log(this.results.count();
  }

  ngOnInit() {
  }

  uploadResults(key,name, squat, bench, deadlift, total, bodyweight, wilks, comp, id){
    this.results.push({nameLower:name, name: name, squat: squat, bench: bench, deadlift:deadlift, total:total, bodyweight:bodyweight, wilks:wilks, comp:comp, id:id});
    alert("Result Uploaded");
  }
}
