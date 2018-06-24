import { Component, OnInit, OnChanges } from '@angular/core';
import { Note } from './shared/models/note.model';
import { DataStorageService } from './shared/services/data-storage.service';
import { AuthService } from './shared/services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  signedIn: boolean;

  constructor(private ds: DataStorageService,
    private auth: AuthService) {

  }

  getsignedInStatus() {
    return this.auth.isAuthenticated();
  }


  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCZr9_nph3wdg-59bOGnFp6U-BHj84XtYs',
      authDomain: 'ng-notebook-jay.firebaseapp.com'
    });
    this.auth.loadUser();
    // this.auth.signedIn.subscribe(
    //   value => {
    //     this.signedIn = value;
    //   }
    // );
    // This is always false when the program refreshes, because the token is undefined
    // at the time this method is called, because it executes BEFORE loadUser
    console.log('calling firebase auth again');
    console.log(firebase.auth().currentUser);
    firebase.auth().onAuthStateChanged(currentUser => {
      this.signedIn = (currentUser !== null);
      console.log(this.signedIn);
    });
    // if (firebase.auth().currentUser !== null) {
    //   this.signedIn = true;
    // } else {
    //   this.signedIn = false;
    // }
  }

}
