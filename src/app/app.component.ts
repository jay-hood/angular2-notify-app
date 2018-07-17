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
  fetched: boolean;

  constructor(
              private auth: AuthService,
              private ns: NoteService) {

  }

  getsignedInStatus() {
    return this.auth.isAuthenticated;
  }

  getNotesFromService() {
    if(!this.fetched){
      console.log('getting notes from database');
      this.ns.getNotesFromDatabase();
    }
    this.fetched = true;
  }


  ngOnInit() {
    this.auth.loadUser();
    this.signedIn = this.auth.isAuthenticated;
    if (this.auth.isAuthenticated) {
      this.getNotesFromService();
    }
    this.auth.signedIn.subscribe(status => {
      if(status === true){
        this.getNotesFromService();
      }
      this.signedIn = status
    });
  }

}
