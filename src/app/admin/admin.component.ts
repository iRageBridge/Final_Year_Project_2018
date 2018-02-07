import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import { Upload } from '../shared/upload/upload';
import { UploadService } from '../shared/upload/upload.service';
import * as _ from "lodash";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Upload;

  private json;
  private results:FirebaseListObservable<any[]>;
  constructor(private af: AngularFireDatabase, private upSvc: UploadService) {
    this.results = this.af.list('/results');
  }

  ngOnInit() {
  }

  uploadResults(key,name, squat, bench, deadlift, total, bodyweight, wilks, comp, id){
    this.results.push({nameLower:name, name: name, squat: squat, bench: bench, deadlift:deadlift, total:total, bodyweight:bodyweight, wilks:wilks, comp:comp, id:id});
    alert("Result Uploaded");
  }

  onFileSelect(event){
    let name = event.target.files[0].name;
    let newName = name.substring(name.lastIndexOf["/"]+1)
    this.json = require('../../../data/'+newName);
    console.log(newName);
  }

  uploadFile(){
    for(var i = 0; i < this.json.length; i++){
      this.results.push(this.json[i]);
    }
    alert("Results uploaded!")
  }
}
