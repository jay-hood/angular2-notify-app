import { Injectable } from '@angular/core';
import { Bulletin } from '../models/bulletin.model';
import { Subject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { DataStorageService } from './data-storage.service';

@Injectable()
export class BulletinBoardService {
  constructor(
    private as: AuthService,
    private ds: DataStorageService
  ) {  }

  boardUpdated: Subject<Bulletin[]> = new Subject<Bulletin[]>();
  bulletinBoard: Observable<Bulletin[]>;

  private _board: Bulletin[] = [];
  private max_id = -1;

  get board(): Bulletin[] {
    return this._board;
  }

  setBoard(board: Bulletin[]) {
    if (board) {
      this._board = board;
      this.getMaxId();
      this.boardUpdated.next(this._board.slice());
    }
  }

  deleteBulletin(id: number): number {
    const index = this._board.findIndex(obj => obj.id === id);
    console.log(index);
    if(index>-1){
      this._board.splice(index, 1);
      this.boardUpdated.next(this._board.slice());
      this.deleteBulletinFromDatabase();
    }
    return index;
  }

  deleteBulletinFromDatabase() {
    this.ds.storeBulletins(this._board.slice());
  }

  getBulletinsFromDatabase(): Observable<Bulletin[]> {
    // this.ds.getBulletins().subscribe(bulletin => {
    //   console.log(bulletin);
    //   this._board = bulletin as Bulletin[];
    //   this.boardUpdated.next(this._board.slice());
    // });
    return this.ds.getBulletins() as Observable<Bulletin[]>;

  }

  storeBulletinsInDatabase(): void {
    this.ds.storeBulletins(this._board.slice());
  }

  addBulletin(title: string, content: string) {
    this.getMaxId();
    if(title === (undefined || null)){
      title = '';
    }
    if(content === (undefined || null)){
      content = '';
    }
    const bulletin = new Bulletin(this.as.currentUserEmail, title, new Date,
      content, this.max_id, this.as.currentUserId, []);
    this._board.unshift(bulletin);
    this.boardUpdated.next(this._board.slice());
    this.getMaxId();
    return bulletin;
  }

  getMaxId(): number {
    this._board.forEach(bulletin => {
      if (bulletin.id >= this.max_id) {
        this.max_id = bulletin.id + 1;
      }
    });
    return this.max_id;
  }





}
