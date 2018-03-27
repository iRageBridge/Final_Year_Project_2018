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
  private name;
  private nameToCompare;
  private results:FirebaseListObservable<any[]>;
  private comps: FirebaseListObservable<any[]>;
  private athletes:FirebaseListObservable<any[]>;
  private currentUpload: Upload;
  private selectedFiles: FileList;
  constructor(private af: AngularFireDatabase,
              private resultsService: ResultsService,
              private upSvc: UploadService) {

    this.results = this.af.list('/results');
    this.athletes = this.af.list('/athletes');
    this.comps = this.af.list('/comps');
  }

  ngOnInit() {}
  //upload file to firebase storage when file is selected
  detectFiles(event){
    this.selectedFiles = event.target.files;
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload);
  }
  //Uploads result to firebase from the admin form
  uploadResult(name, theClass, bodyweight, weightClass, squat, bench, deadlift, total, wilks, comp, id, compId,resultId, place){
    this.nameToCompare = this.af.list('/athletes',{
      query: {
        orderByChild: name,
        equalTo: this.name
      }
    })
    const resultSend = this.af.object(`/results/${resultId}`);
    const athleteSend = this.af.object(`/athletes/${id}`);
    resultSend.set({nameLower:name.toLowerCase(), name: name, class:theClass, bodyweight:bodyweight, weight_class:weightClass, squat: squat, bench: bench, deadlift:deadlift, total:total, wilks:wilks, comp:comp, id:id, compId:compId, resultId:resultId, place: place});
    athleteSend.set({nameLower:name.toLowerCase(), name: name, class:theClass, bodyweight:bodyweight, weight_class:weightClass, squat: squat, bench: bench, deadlift:deadlift, total:total, wilks:wilks, comp:comp, id:id, compId:compId, place: place});
    alert("Result Uploaded");
  }
  //gets url of uploaded file, parses through it and pushes results to database
  uploadResults(){
    let url = this.currentUpload.url;
    fetch(url).then(res=>res.json()).then((out) => {
      for(var i = 0; i < out.length; i++){
        this.results.push(out[i]);
        this.athletes.push(out[i])
      }
      alert("Results Uploaded");
    }).catch(err => {throw err });
  }
}
