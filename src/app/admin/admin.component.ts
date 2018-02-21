import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import * as _ from "lodash";
import { ResultsService } from "../shared/results/results.service";
import * as firebase from 'firebase/app';
import { UploadService } from '../shared/upload/upload.service';
import { Upload } from '../shared/upload/upload';
import { Result } from "../shared/model/result";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private selectedNameIds:FirebaseListObservable<any[]>;
  private json:Object;
  private fileName;
  private results:FirebaseListObservable<any[]>;
  private currentUpload: Upload;
  private selectedFiles: FileList;
  constructor(private af: AngularFireDatabase,
              private resultsService: ResultsService,
              private upSvc: UploadService) {

    this.results = this.af.list('/results');
    this.selectedNameIds = this.af.list('/results', {
      query: {
        orderByChild: 'id',
        limitToFirst: 1,
      }
    })
  }

  ngOnInit() { }

  detectFiles(event){
    this.selectedFiles = event.target.files;
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload);
  }

  uploadResult(name, squat, bench, deadlift, total, bodyweight, wilks, comp, id, place){
    this.results.push({nameLower:name.toLowerCase(), name: name, squat: squat, bench: bench, deadlift:deadlift, total:total, bodyweight:bodyweight, wilks:wilks, comp:comp, id:id, placing: place});
    alert("Result Uploaded");
  }

  uploadResults(){
    let url = this.currentUpload.url;
    fetch(url).then(res=>res.json()).then((out) => {
      console.log('Results: ', out);
      for(var i = 0; i < out.length; i++){
        this.results.push(out[i]);
      }
      alert("Results Uploaded");
    }).catch(err => {throw err });
  }
}
