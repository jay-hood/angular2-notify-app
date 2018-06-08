import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../../shared/models/item.model';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.css']
})
export class EditDetailComponent implements OnInit {

  @Input() items: Item[];

  constructor() { }

  ngOnInit() {
  }

}
