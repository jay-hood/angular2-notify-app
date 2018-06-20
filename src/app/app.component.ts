import { Component, OnInit, OnChanges } from '@angular/core';
import { Item } from './shared/models/item.model';
import { DataStorageService } from './shared/services/data-storage.service';
import { AuthService } from './shared/services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'app';
  signedIn: boolean;

  constructor(private ds: DataStorageService,
    private auth: AuthService) {

  }

  getsignedInStatus() {
    return this.auth.isAuthenticated();
  }

  ngOnChanges() {
    this.signedIn = this.auth.isAuthenticated();
    if (this.signedIn) {
      this.ds.getNotes();
    }
  }



  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCZr9_nph3wdg-59bOGnFp6U-BHj84XtYs',
      authDomain: 'ng-notebook-jay.firebaseapp.com'
    });
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     // user.getIdToken().then(function(token) {
    //     //
    //     //   // this.auth.setToken(token);
    //     //   // this.ds.getNotes();
    //     // });
    //     console.log(user.email);
    //     this.signedIn = true;
    //   } else {
    //     this.signedIn = false;
    //   }
    // });
    this.auth.signedIn.subscribe(
      value => {
        this.signedIn = value;
        if (this.signedIn) {
          this.ds.getNotes();
        }
      }
    );

    this.signedIn = this.auth.isAuthenticated();
    if (this.signedIn) {
      console.log('getting notes?');
      this.ds.getNotes();
    }
  }
}
