import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { Subject } from 'rxjs';

@Injectable()
export class ToDoListService {

  private currentMaxId: number = -1;
  listUpdated = new Subject<Item[]>();

  firstItemOneDetails: Item = new Item(2,
    'detail one',
    new Date,
    [new Item(3,
      'detail one-one',
      new Date,
        [new Item(4,'detail one-one-one', new Date)]
      )
    ]
  );
  secondItemOneDetails: Item = new Item(6,
    'detail two',
    new Date,
    [new Item(7,
      'detail two-one',
      new Date,
        [new Item(8,'detail two-one-one', new Date)]
      )
    ]
  );
  thirdItemOneDetails: Item = new Item(10,
    'detail three',
    new Date,
    [new Item(11,
      'detail three-one',
      new Date,
        [new Item(12,'detail three-one-one', new Date)]
      )
    ]
  );


  private items: Item[] = [
    new Item(1, 'test item 1', new Date(), [this.firstItemOneDetails]),
    new Item(5, 'test item 2', new Date(), [this.secondItemOneDetails]),
    new Item(9, 'test item 3', new Date(), [this.thirdItemOneDetails])
  ];

  getItems() {
    return this.items.slice();
  }

  deleteChildItems(index: number) {

    this.recursiveChildDelete(this.items, index);
    this.listUpdated.next(this.items.slice());
  }

  deleteItemAndShiftChildren(index: number) {

  }

  recursiveChildDelete(items: Item[], index: number) {
    items.forEach( element => {
      if(element.id==index){
        element.items = [];
      } else if(element.items) {
        this.recursiveChildDelete(element.items, index);
      }
    });
  }

  getMaxId(items: Item[]) {
    this.items.forEach( element => {
      if(element.id>this.currentMaxId){
        this.currentMaxId = element.id;
      } else if(element.items){
        this.getMaxId(element.items);
      }
    });
    return this.currentMaxId;
  }

  getItem(index: number) {
    return this.items.slice()[index];
  }

  addItem(item: Item) {
    this.items.push(item);
    this.listUpdated.next(this.items.slice());
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.listUpdated.next(this.items.slice());

  }

  constructor() { }
}
