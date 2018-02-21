import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import * as _ from "lodash";
import { ResultsService } from "../shared/results/results.service";
import * as firebase from 'firebase/app';
import { UploadService } from '../shared/upload/upload.service';
import { Upload } from '../shared/upload/upload';
import * as $ from 'jquery';
import { Result } from "../shared/model/result";
import { Jsonp } from '@angular/http';

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

  getJSON (url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      let status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
  }

  uploadResults(){
    let url = this.currentUpload.url;
    fetch(url).then(res=>res.json()).then((out) => {
      console.log('Json: ', out);
      for(var i = 0; i < out.length; i++){
        this.results.push(out[i]);
      }
    }).catch(err => {throw err });


    /*this.getJSON(this.currentUpload.url,
    function(err, data) {
      if (err !== null) {
        alert('Something went wrong: ' + err);
      } else {
        console.log(data);
        this.results.push(data);
      }
    });

   /*$.getJSON(this.currentUpload.url, function(data){ 
     this.json = data;
     console.log(typeof data);
      //for(var i = 0; i < data.length; i++){
        //console.log(data);
        //console.log(data[i]);
        //console.log(this.data[0]);
      //}
    });
    //this.results.push(this.json[0]);
    console.log(typeof this.json);*/
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
}
