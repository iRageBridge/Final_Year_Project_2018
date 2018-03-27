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
  private _selectedNameIds:FirebaseListObservable<any[]>;
  private _name;
  private _nameToCompare;
  private _results:FirebaseListObservable<any[]>;
  private _comps: FirebaseListObservable<any[]>;
  private _athletes:FirebaseListObservable<any[]>;
  private _currentUpload: Upload;
  private _selectedFiles: FileList;
  constructor(private _af: AngularFireDatabase,
              private _resultsService: ResultsService,
              private _upSvc: UploadService) {

    this._results = this._af.list('/results');
    this._athletes = this._af.list('/athletes');
    this._comps = this._af.list('/comps');
  }

  ngOnInit() {}
  //upload file to firebase storage when file is selected
  detectFiles(event){
    this._selectedFiles = event.target.files;
    let file = this._selectedFiles.item(0);
    this._currentUpload = new Upload(file);
    this._upSvc.pushUpload(this._currentUpload);
  }
  //Uploads result to firebase from the admin form
  uploadResult(name, theClass, bodyweight, weightClass, squat, bench, deadlift, total, wilks, comp, id, compId,resultId, place){
    this._nameToCompare = this._af.list('/athletes',{
      query: {
        orderByChild: name,
        equalTo: this._name
      }
    })
    const resultSend = this._af.object(`/results/${resultId}`);
    const athleteSend = this._af.object(`/athletes/${id}`);
    resultSend.set({nameLower:name.toLowerCase(), name: name, class:theClass, bodyweight:bodyweight, weight_class:weightClass, squat: squat, bench: bench, deadlift:deadlift, total:total, wilks:wilks, comp:comp, id:id, compId:compId, resultId:resultId, place: place});
    athleteSend.set({nameLower:name.toLowerCase(), name: name, class:theClass, bodyweight:bodyweight, weight_class:weightClass, squat: squat, bench: bench, deadlift:deadlift, total:total, wilks:wilks, comp:comp, id:id, compId:compId, place: place});
    alert("Result Uploaded");
  }
  //gets url of uploaded file, parses through it and pushes results to database
  uploadResults(){

    let url = this._currentUpload.url;
    fetch(url).then(res=>res.json()).then((out) => {
      for(var i = 0; i < out.length; i++){
        this._results.push(out[i]);
        this._athletes.push(out[i])
      }
      alert("Results Uploaded");
    }).catch(err => {throw err });
  }
}
