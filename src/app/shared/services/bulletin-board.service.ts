import { Injectable } from '@angular/core';
import { Bulletin } from '../models/bulletin.model';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { DataStorageService } from './data-storage.service';

@Injectable()
export class BulletinBoardService {
  constructor(
    private as: AuthService,
    private ds: DataStorageService
  ) {  }

  boardUpdated: Subject<Bulletin[]> = new Subject<Bulletin[]>();

  private _board: Bulletin[] = [];
  private max_id = -1;

  get board() {
    return this._board;
  }

  set board(board: Bulletin[]) {
    if (board) {
      this._board = board;
      this.getMaxId();
      this.boardUpdated.next(this._board.slice());
    }
  }

  deleteBulletin(id: number) {
    const index = this._board.findIndex(obj => obj.id === id);
    this._board.splice(index, 1);
    this.boardUpdated.next(this._board.slice());
  }

  deleteBulletinFromDatabase() {
    this.ds.storeBulletins(this._board.slice());
  }

  getBulletinsFromDatabase() {
    this.ds.getBulletins().subscribe(bulletin => {
      console.log(bulletin);
      this._board = bulletin as Bulletin[];
      this.boardUpdated.next(this._board.slice());
    });
  }

  storeBulletinsInDatabase() {
    this.ds.storeBulletins(this._board.slice());
  }

  addBulletin(title: string, content: string) {
    const bulletin = new Bulletin(this.as.currentUserEmail, title, new Date,
      content, this.max_id, this.as.currentUserId);
    this._board.unshift(bulletin);
    this.boardUpdated.next(this._board.slice());
    this.getMaxId();
    console.log('bulletin successfully added');
  }

  getMaxId() {
    this._board.forEach(bulletin => {
      if (bulletin.id > this.max_id) {
        this.max_id = bulletin.id + 1;
      }
    });
  }





}
