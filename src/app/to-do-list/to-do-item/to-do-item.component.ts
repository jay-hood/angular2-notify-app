import { Component, OnInit, OnDestroy, OnChanges, Input, EventEmitter } from '@angular/core';
import { ToDoListService } from '../../shared/services/to-do-list.service';
import { Item } from '../../shared/models/item.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.css']
})
export class ToDoItemComponent {
  @Input() items: Item[] = [];
  @Input() prevItem: Item;
  @Input() editMode: boolean;

  creationNumber: number;
  listSubscription: Subscription;
  constructor(private list: ToDoListService, public config: NgbDropdownConfig) {
    this.config.placement = 'right';
    // this.creationNumber = this.list.getCreationNumber();
    // this.list.incrementCreationNumber();
  }


  onDelete(index: number) {
    this.list.deleteItemAndShiftChildren(index);
  }

  onDeleteChildren(index: number) {
    this.list.deleteChildItems(index);
    console.log(index);
  }


}
