import { Component, Input } from '@angular/core';
import { ToDoListService } from '../../shared/services/to-do-list.service';
import { DataStorageService } from '../../shared/services/data-storage.service';
import { Item } from '../../shared/models/item.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Response } from '@angular/http';


@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.css']
})
export class ToDoItemComponent {
  @Input() items: Item[] = [];
  @Input() prevItem: Item;
  @Input() editMode: boolean;
  @Input() isCollapsed = false;


  nextCollapse = false;
  creationNumber: number;
  listSubscription: Subscription;
  constructor(
    private list: ToDoListService,
    private config: NgbDropdownConfig,
    private ds: DataStorageService) {
      this.config.placement = 'right';
      // this.creationNumber = this.list.getCreationNumber();
      // this.list.incrementCreationNumber();
      // this.isCollapsed = true;
  }


  onDelete(index: number) {
    this.list.deleteItemAndShiftChildren(index);
    this.ds.storeNotes().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  onDeleteChildren(index: number) {
    this.list.deleteChildItems(index);
    this.ds.storeNotes().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
    console.log(index);
  }


}
