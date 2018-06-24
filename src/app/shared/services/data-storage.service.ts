import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NoteService } from './note.service';
import { AuthService } from './auth.service';
import { Note } from '../models/note.model';

@Injectable()
export class DataStorageService {
  constructor(
    private http: Http,
    private notes: NoteService,
    private auth: AuthService) {  }

  storeNotes() {
    const token = this.auth.getToken();
    return this.http.put('https://ng-notebook-jay.firebaseio.com/notes.json?auth=' + token,
      this.notes.getNotes());
  }

  getNotes() {
    const token = this.auth.getToken();
    return this.http.get('https://ng-notebook-jay.firebaseio.com/notes.json?auth=' + token)
      .subscribe(
        (response: Response) => {
          const notes: Note[] = response.json();
          this.notes.setNotes(notes);
        }
      );
  }
}
