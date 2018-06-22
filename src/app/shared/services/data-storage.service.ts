import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ToDoListService } from './to-do-list.service';
import { AuthService } from './auth.service';
import { Item } from '../models/item.model';

@Injectable()
export class DataStorageService {
  constructor(
    private http: Http,
    private list: ToDoListService,
    private auth: AuthService) {  }

  storeNotes() {
    const token = this.auth.getToken();
    return this.http.put('https://ng-notebook-jay.firebaseio.com/notes.json?auth=' + token,
      this.list.getItems());
  }

  getNotes() {
    const token = this.auth.getToken();
    return this.http.get('https://ng-notebook-jay.firebaseio.com/notes.json?auth=' + token)
      .subscribe(
        (response: Response) => {
          const notes: Item[] = response.json();
          this.list.setItems(notes);
        }
      );
  }
}
