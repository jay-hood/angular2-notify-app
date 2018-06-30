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
    const token = this.auth.getToken();
    const userId = this.auth.userId;
    return this.http.put(`https://ng-notebook-jay.firebaseio.com/${userId}/notes.json?auth=` + token,
      this.notes.getNotes());
  }

  getNotes() {
    const token = this.auth.getToken();
    const userId = this.auth.userId;
    return this.http.get(`https://ng-notebook-jay.firebaseio.com/${userId}/notes.json?auth=` + token)
      .subscribe(
        (response: Response) => {
          const notes: Note[] = response.json();
          this.notes.setNotes(notes);
        }
      );
  }

  storeBulletins() {
    const token = this.auth.getToken();
    console.log(this.bbs.board);
    return this.http.put('https://ng-notebook-jay.firebaseio.com/board.json?auth=' + token,
      this.bbs.board).subscribe(response => console.log(response));
  }

  getBulletins() {
    const token = this.auth.getToken();
    return this.http.get('https://ng-notebook-jay.firebaseio.com/board.json?auth=' + token)
      .subscribe(
        (response: Response) => {
          const bulletins: Bulletin[] = response.json();
          this.bbs.board = bulletins;
        }
      );
  }
}
