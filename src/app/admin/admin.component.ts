import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import * as _ from "lodash";
import { error } from 'util';
import { Angular2TokenService } from 'angular2-token';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  selectedFiles: FileList;

  private fileToUpload: File = null;
  private json;
  private id;
  private fileName;
  private results:FirebaseListObservable<any[]>;
  constructor(private af: AngularFireDatabase, private tokenService: Angular2TokenService) {
    this.results = this.af.list('/results');
  }

  ngOnInit() {
  }

  uploadResults(name, squat, bench, deadlift, total, bodyweight, wilks, comp, id){
    this.results.push({nameLower:name, name: name, squat: squat, bench: bench, deadlift:deadlift, total:total, bodyweight:bodyweight, wilks:wilks, comp:comp, id:id});
    alert("Result Uploaded");
  }

  /*onFileSelect(file: HTMLInputElement){
    let name = file.value;
    let fileName = name.replace(/^.*[\\\/]/, '');
    console.log(fileName);
    this.fileName = fileName;
  }*/

  //onFileSelect(file:File){
    //var formData:FormData = new FormData();
    //formData.append("file", file, file.name);
    //console.log(file.name);
    //var xhr = new XMLHttpRequest();
    //xhr.open("PUT", "/uploads", true);
    //xhr.send(formData);
  //}

  /*uploadFile(){
    this.json = require("./uploads/"+this.fileName);
    for(var i = 0; i < this.json.length; i++){
      this.results.push(this.json[i]);
    }
    alert("Results uploaded!")
    if(error){
      alert("Error uploading results");
    }
  }*/

  handleFileInput(files:FileList){
    this.fileToUpload = files.item[0];
  }
}
