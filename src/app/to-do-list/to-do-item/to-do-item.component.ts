import { Component, OnInit, OnDestroy, OnChanges, Input, EventEmitter } from '@angular/core';
import { ToDoListService } from '../../shared/services/to-do-list.service';
import { Item } from '../../shared/models/item.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.css']
})
export class ToDoItemComponent implements OnInit, OnDestroy {

  // firstItemOneDetails: Details;
  // @Input() details: Details[] = [];
  isCollapsed: boolean;
  detailsInitialized = false;
  itemNumber: number;
  item: Item;
  @Input() items: Item[] = [];
  paramsSubscription: Subscription;
  itemSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private toDoListService: ToDoListService) {
      // this.isCollapsed = true;
      this.paramsSubscription = this.route.params.subscribe( params => {
       this.itemNumber = +params['itemNumber'];
     });
     this.items = this.toDoListService.getItem(this.itemNumber).items;
     // this.items = this.item.items;


       // adding this subscription appears to fix the delete problem
       // the child-delete, however, seems to be broken
    }

  onEdit() {

  }

  onDelete(index: number) {
    this.toDoListService.deleteItemAndShiftChildren(index);
  }

  onDeleteChildren(index: number) {
    this.toDoListService.deleteChildItems(index);
  }

// One issue is that I might need to update that subscription. Maybe. I don't know
// About the benefits or drawbacks of subscribing in the constructor vs. onInit.
  ngOnInit() {
  this.itemSubscription = this.toDoListService.listUpdated.subscribe(
    (items: Item[]) => {
      this.items = items[this.itemNumber].items;
    });


  }

  ngOnDestroy() {
    // this.paramsSubscription.unsubscribe();
  }



}
