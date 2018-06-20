import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToDoListService } from '../../../shared/services/to-do-list.service';
import { Item } from '../../../shared/models/item.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-item-root',
  templateUrl: 'item-root.component.html'
})
export class ItemRootComponent implements OnInit {

  items: Item[] = [];
  routingNumber: number;
  editMode = false;
  editModeStr: string;
  listSubscription: Subscription;


  constructor(private route: ActivatedRoute, private list: ToDoListService) {

  }

  editToggle() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.editModeStr = 'ON';
    } else {
      this.editModeStr = 'OFF';
    }
  }

  ngOnInit() {
    this.editModeStr = 'OFF';
    this.route.params.subscribe(
      params => {
        this.routingNumber = +params['itemNumber'];
        this.items = this.list.getItem(this.routingNumber);
        console.log(this.routingNumber);
      }
    );
    this.listSubscription = this.list.listUpdated.subscribe(
      (items: Item[]) => {
        this.items = items.slice(this.routingNumber, this.routingNumber + 1);
      }
    );
  }


}
