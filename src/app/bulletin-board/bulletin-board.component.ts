import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { BulletinBoardService } from '../shared/services/bulletin-board.service';
import { DataStorageService } from '../shared/services/data-storage.service';
import { Bulletin } from '../shared/models/bulletin.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bulletin-board',
  templateUrl: './bulletin-board.component.html',
  styleUrls: ['./bulletin-board.component.css']
})
export class BulletinBoardComponent implements OnInit {

  constructor(private bb: BulletinBoardService, private ds: DataStorageService) { }

  bulletinBoardSubscription: Subscription;

  newBulletin = false;
  bulletinForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });

  bulletinArray: Bulletin[] = [];

  ngOnInit() {
    this.bulletinArray = this.bb.board;
    this.ds.getBulletins();
    this.bulletinBoardSubscription = this.bb.boardUpdated.subscribe(
      (board: Bulletin[]) => {
        this.bulletinArray = board;
        console.log(board);
      });
  }

  onSubmit(form: NgForm) {
    this.bb.addBulletin(form.value.title, form.value.content);
    this.ds.storeBulletins();
    this.newBulletin = false;
  }

  onAddBulletin() {
    this.newBulletin = true;
  }

}
