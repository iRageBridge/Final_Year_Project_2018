import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import * as _ from "lodash";
import { error } from 'util';
import { ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/primeng';
import { ResultsService } from "../shared/results/results.service";
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild('fileInput') fileInput: FileUpload;
  selectedFiles: FileList;

  private name;
  private selectedNameIds:FirebaseListObservable<any[]>;
  private json;
  private fileName;
  private results:FirebaseListObservable<any[]>;
  private uploader: FileUploader;
  constructor(private af: AngularFireDatabase,
              private resultsService: ResultsService) {
    this.uploader = new FileUploader({url:"\\irishpfdatabase\\uploads"});
    this.uploader.onErrorItem = item => {
      console.error("Failed to upload");
    }
    this.uploader.onCompleteItem = (item,response) => {
      console.info("Successfully uploaded");
    }

    this.uploader.onAfterAddingFile = fileItem => this.uploader.uploadAll();

    this.results = this.af.list('/results');
    this.selectedNameIds = this.af.list('/results', {
      query: {
        orderByChild: 'id',
        limitToFirst: 1,
      }
    })
  }

  ngOnInit() {
    console.log(this.selectedNameIds);
  }

  uploadResults(name, squat, bench, deadlift, total, bodyweight, wilks, comp, id, place){
    this.results.push({nameLower:name.toLowerCase(), name: name, squat: squat, bench: bench, deadlift:deadlift, total:total, bodyweight:bodyweight, wilks:wilks, comp:comp, id:id, placing: place});
    alert("Result Uploaded");
  }

  onFileSelect(file: HTMLInputElement){
    let name = file.value;
    let fileName = name.replace(/^.*[\\\/]/, '');
    console.log(fileName);
    this.fileName = fileName;
  }

  /*startUpload(){
    this.fileInput.upload();
  }

  onFileSelect(file:File){
    var formData:FormData = new FormData();
    formData.append("file", file, file.name);
    console.log(file.name);
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/uploads", true);
    xhr.send(formData);
  }*/

  uploadFile(){
    this.json = require("./uploads/"+this.fileName);
    for(var i = 0; i < this.json.length; i++){
      this.results.push(this.json[i]);
    }
    alert("Results uploaded!")
    if(error){
      alert("Error uploading results");
    }
  }
}
