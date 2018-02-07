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

  private results:FirebaseListObservable<any[]>;
  private json = require('../../../data/dummy.json');
  constructor(private af: AngularFireDatabase, private upSvc: UploadService) {
    this.results = this.af.list('/results');
  }

  detectFiles(event){
    this.selectedFiles = event.target.files;
  }

  uploadSingle(){
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload);
  }

  ngOnInit() {
  }

  uploadResults(key,name, squat, bench, deadlift, total, bodyweight, wilks, comp, id){
    this.results.push({nameLower:name, name: name, squat: squat, bench: bench, deadlift:deadlift, total:total, bodyweight:bodyweight, wilks:wilks, comp:comp, id:id});
    alert("Result Uploaded");
  }
/*
  onFileUpload(file: HTMLInputElement){
    let name = file.value;
    console.log(name);
  }

  getFile(){
    for(var i = 0; i < this.json.length; i++){
      this.results.push(this.json[i]);
    }
  }*/
}
