import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthService } from './auth.service';
import { Note } from '../models/note.model';
import { Bulletin } from '../models/bulletin.model';


@Injectable()
export class DataStorageService {
  constructor(
    private http: Http,
    private auth: AuthService) {  }

  storeNotes(notes: Note[]) {
    // return this.http.put(`https://ng-notebook-jay.firebaseio.com/${userId}/notes.json?auth=` + token,
    //   this.notes.getNotes());
    const items = this.auth.db.list(`${this.auth.currentUserId}/notes`);
    items.remove().then(() => {
      notes.forEach(note => items.push(note));
    });
  }

  getNotes() {
    // const token = this.auth.currentUserIdToken;
    // const userId = this.auth.currentUserId;
    // return this.http.get(`https://ng-notebook-jay.firebaseio.com/${userId}/notes.json?auth=` + token)
    //   .subscribe(
    //     (response: Response) => {
    //       const notes: Note[] = response.json();
    //       this.notes.setNotes(notes);
    //     }
    //   );

    return this.auth.db.list(`${this.auth.currentUserId}/notes`).valueChanges();

  }

  storeBulletins(bullets) {

    const bulletins = this.auth.db.list('/board');
    bulletins.remove().then(() => {
      bullets.forEach(bullet => bulletins.push(bullet));
    });
    console.log(bullets);

    // const token = this.auth.currentUserIdToken;
    // console.log(this.bbs.board);
    // return this.http.put('https://ng-notebook-jay.firebaseio.com/board.json?auth=' + token,
    //   this.bbs.board).subscribe(response => console.log(response));
  }

  getBulletins() {

    return this.auth.db.list('/board').valueChanges();

    // const token = this.auth.currentUserIdToken;
    // return this.http.get('https://ng-notebook-jay.firebaseio.com/board.json?auth=' + token)
    //   .subscribe(
    //     (response: Response) => {
    //       const bulletins: Bulletin[] = response.json();
    //       this.bbs.board = bulletins;
    //     }
    //   );
  }
}
