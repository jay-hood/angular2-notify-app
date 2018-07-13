import { Component, OnInit, Input } from '@angular/core';
import { Bulletin } from '../../shared/models/bulletin.model';
import { BulletinBoardService } from '../../shared/services/bulletin-board.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.css']
})
export class BulletinComponent implements OnInit {

  @Input() bulletin: Bulletin;

  constructor(private bbs: BulletinBoardService,
              public as: AuthService) { }

  onDelete(id: number) {
    this.bbs.deleteBulletin(id);
    this.bbs.deleteBulletinFromDatabase();
  }

  ngOnInit() {
  }

}
