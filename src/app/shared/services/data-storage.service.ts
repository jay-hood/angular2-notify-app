import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NoteService } from './note.service';
import { BulletinBoardService } from './bulletin-board.service';
import { AuthService } from './auth.service';
import { Note } from '../models/note.model';
import { Bulletin } from '../models/bulletin.model';


@Injectable()
export class DataStorageService {
  constructor(
    private http: Http,
    private notes: NoteService,
    private auth: AuthService,
    private bbs: BulletinBoardService) {  }

  storeNotes() {
    const token = this.auth.currentUserIdToken;
    const userId = this.auth.currentUserId;
    // return this.http.put(`https://ng-notebook-jay.firebaseio.com/${userId}/notes.json?auth=` + token,
    //   this.notes.getNotes());
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

    return this.auth.db.list(`${this.auth.currentUserId}/notes`).valueChanges().subscribe(
      (res) => {
        // const notes = res as Note[];
        this.notes.setNotes(res);
      });

  }

  storeBulletins() {
    const token = this.auth.currentUserIdToken;
    console.log(this.bbs.board);
    return this.http.put('https://ng-notebook-jay.firebaseio.com/board.json?auth=' + token,
      this.bbs.board).subscribe(response => console.log(response));
  }

  getBulletins() {
    const token = this.auth.currentUserIdToken;
    return this.http.get('https://ng-notebook-jay.firebaseio.com/board.json?auth=' + token)
      .subscribe(
        (response: Response) => {
          const bulletins: Bulletin[] = response.json();
          this.bbs.board = bulletins;
        }
      );
  }
}
