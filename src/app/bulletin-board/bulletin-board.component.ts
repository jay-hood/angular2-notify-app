import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { BulletinBoardService } from '../shared/services/bulletin-board.service';
import { Bulletin } from '../shared/models/bulletin.model';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-bulletin-board',
  templateUrl: './bulletin-board.component.html',
  styleUrls: ['./bulletin-board.component.css']
})
export class BulletinBoardComponent implements OnInit {

  constructor(private bb: BulletinBoardService) { }

  bulletinBoardSubscription: Subscription;
  bulletinBoard: Observable<Bulletin[]>;

  newBulletin = false;
  bulletinForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });

  bulletinArray: Bulletin[] = [];

  ngOnInit() {
    // this.bulletinArray = this.bb.board;
    // this.bb.getBulletinsFromDatabase();
    // this.bulletinBoardSubscription = this.bb.boardUpdated.subscribe(
    //   (board: Bulletin[]) => {
    //     this.bulletinArray = board;
    //     console.log(board);
    //   });
    this.bulletinBoard = this.bb.getBulletinsFromDatabase();
    this.bb.getBulletinsFromDatabase().subscribe(res => this.bb.setBoard(res));
  }

  onSubmit(form: NgForm) {
    this.bb.addBulletin(form.value.title, form.value.content);
    this.bb.storeBulletinsInDatabase();
    this.newBulletin = false;
  }

  onAddBulletin() {
    this.bulletinForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });
    this.newBulletin = true;

  }

}
