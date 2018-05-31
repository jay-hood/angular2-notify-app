import { Component, OnInit, Input } from '@angular/core';
import { ToDoListService } from '../../shared/services/to-do-list.service';
import { Item } from '../../shared/models/item.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-to-do-item-list',
  templateUrl: './to-do-item-list.component.html',
  styleUrls: ['./to-do-item-list.component.css']
})
export class ToDoItemListComponent implements OnInit {

  @Input() item: Item;
  @Input() index: number;

  constructor() { }

  ngOnInit() {

  }

}
