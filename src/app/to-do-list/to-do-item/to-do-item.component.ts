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

  isCollapsed: boolean;
  itemNumber: number;
  item: Item;
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private toDoListService: ToDoListService) {
      this.isCollapsed = true;
    }


  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe( params => {
      this.itemNumber = +params['itemNumber'];
      this.item = this.toDoListService.getItem(this.itemNumber);
      console.log(this.item);
    });
    }

    ngOnDestroy() {
      this.paramsSubscription.unsubscribe();
    }



}
