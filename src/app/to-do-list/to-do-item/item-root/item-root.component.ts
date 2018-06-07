import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToDoListService } from '../../../shared/services/to-do-list.service';
import { Item } from '../../../shared/models/item.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-item-root',
    template: `<app-to-do-item [items]="items"></app-to-do-item>`
})
export class ItemRootComponent implements OnInit {

  items: Item[] = [];
  routingNumber: number;


  listSubscription: Subscription;


  constructor(private route: ActivatedRoute, private list: ToDoListService) {
    this.route.params.subscribe(
      params => {
        this.routingNumber = +params['itemNumber'];
      }
    )
    this.listSubscription = this.list.listUpdated.subscribe(
      (items: Item[]) => {
        this.items = items;
        // console.log('subscription triggered: ' + items[0].details);
        // console.log(this.prevItem);
      }
    );
    this.items = this.list.getItems();
  }

  ngOnInit() {

  }

}
