import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { Upload } from './upload';
import * as firebase from 'firebase';

@Injectable()
export class UploadService {

  constructor(private af: AngularFireDatabase) { }

  private basePath:string = '/uploads';
  uploads: FirebaseListObservable<Upload[]>;
  //Upload selected file to fireabase storage
  pushUpload(upload:Upload){
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes)*100
      },
      (error) => {
        console.log(error)
      },
      () => {
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload)
      } 
    );
  }

  private saveFileData(upload: Upload){
    this.af.list(`${this.basePath}/`).push(upload);
  }
}
