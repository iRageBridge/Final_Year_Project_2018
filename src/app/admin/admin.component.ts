import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import * as _ from "lodash";
import { ResultsService } from "../shared/results/results.service";
import * as firebase from 'firebase/app';
import { UploadService } from '../shared/upload/upload.service';
import { Upload } from '../shared/upload/upload';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private selectedNameIds:FirebaseListObservable<any[]>;
  private json;
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

  detectFiles(event){
    this.selectedFiles = event.target.files;
  }

  ngOnInit() { }

  uploadResult(name, squat, bench, deadlift, total, bodyweight, wilks, comp, id, place){
    this.results.push({nameLower:name.toLowerCase(), name: name, squat: squat, bench: bench, deadlift:deadlift, total:total, bodyweight:bodyweight, wilks:wilks, comp:comp, id:id, placing: place});
    alert("Result Uploaded");
  }

  uploadSingle(){
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload);
  }

  /*onFileSelect(file: HTMLInputElement){
    let name = file.value;
    let fileName = name.replace(/^.*[\\\/]/, '');
    console.log(fileName);
    this.fileName = fileName;
  }

  startUpload(){
    this.fileInput.upload();
  }

  onFileSelect(file:File){
    var formData:FormData = new FormData();
    formData.append("file", file, file.name);
    console.log(file.name);
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/uploads", true);
    xhr.send(formData);
  }
*/
  uploadResults(){
    this.json = $.getJSON("https://firebasestorage.googleapis.com/v0/b/irishpf-database.appspot.com/o/uploads%2Ftest2.json?alt=media&token=4b737c67-e755-41cc-8fab-179969d6169e", function(data){
      console.log(data);
    });
    for(var i = 0; i < this.json.length; i++){
      this.results.push(this.json[i]);
    }
  }
}
