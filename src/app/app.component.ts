import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { NoteService } from './shared/services/note.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  signedIn: boolean;

  constructor(
              private auth: AuthService,
              private ns: NoteService) {

  }

  getsignedInStatus() {
    return this.auth.isAuthenticated;
  }


  ngOnInit() {
    this.auth.loadUser();
    this.signedIn = this.auth.isAuthenticated;
    // if (this.auth.isAuthenticated) {
    //   this.ns.getNotesFromDatabase();
    // }
    // this.auth.signedIn.subscribe(
    //   value => {
    //     this.signedIn = value;
    //   }
    // );
    // This is always false when the program refreshes, because the token is undefined
    // at the time this method is called, because it executes BEFORE loadUser
    this.auth.signedIn.subscribe(status => this.signedIn = status);
    // if (firebase.auth().currentUser !== null) {
    //   this.signedIn = true;
    // } else {
    //   this.signedIn = false;
    // }
  }

}
