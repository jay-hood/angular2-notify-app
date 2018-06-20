import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { Subject } from 'rxjs';

@Injectable()
export class ToDoListService {

  private currentMaxId = -1;
  listUpdated: Subject<Item[]> = new Subject<Item[]>();
  temp: Item = null;

  // itemSeven = new Item(6, 'detail seven', new Date);
  // itemSix = new Item(7, 'detail six', new Date, [this.itemSeven]);
  // itemFive = new Item(6, 'detail five', new Date, [this.itemSix]);
  // itemFour = new Item(5, 'detail four', new Date);
  // itemThree = new Item(4, 'detail three', new Date, [this.itemFour]);
  // itemTwo = new Item(3, 'detail two', new Date, [this.itemThree]);
  // itemOne = new Item(2, 'detail one', new Date, [this.itemTwo]);
  // ItemZero = new Item(1, 'test item 1', new Date(), [this.itemOne, this.itemFive]);

  private items: Item[] = [];

  getItems() {
    return this.items.slice();
  }

  replaceItem(itemNumber: number, item: Item) {
    this.items[itemNumber] = item;
    this.listUpdated.next(this.items.slice());
  }

  setItems(items: Item[]) {
    if (items) {
      this.items = items;
      this.listUpdated.next(this.items.slice());
    }
  }

  deleteChildItems(index: number) {
    this.recursiveChildDelete(this.items, index);
    this.listUpdated.next(this.items.slice());
  }

  deleteItemAndShiftChildren(index: number) {
    this.recursiveChildShift(this.items, this.items[0], index);
    this.listUpdated.next(this.items.slice());
  }

  recursiveChildDelete(items: Item[], index: number) {
    items.forEach( element => {
      if (element.id === index) {
        if (element.items) {
          delete element.items;
        }
        return;
      } else if (element.items) {
        this.recursiveChildDelete(element.items, index);
      }
    });
  }

  recursiveChildShift(items: Item[], oldItem: Item, index: number) {
    items.forEach( item => {
      if (item.items) {
        if (item.id === index) {
          if (item === oldItem) {
            this.items = item.items;
          } else {
            oldItem.items.push(...item.items);
            oldItem.items.forEach( function(current, value, object) {
              if (current.id === index) {
                object.splice(value, 1);
              }
            });
          }
        } else {
          this.recursiveChildShift(item.items, item, index);
        }
      } else if (item.id === index) {
          oldItem.items.forEach( function(current, value, object) {
            if (current.id === index) {
              object.splice(value, 1);
            }
          });
      }
    });
  }

  getMaxId(items: Item[]) {
    this.items.forEach( element => {
      if (element.id > this.currentMaxId) {
        this.currentMaxId = element.id;
      } else if (element.items) {
        this.getMaxId(element.items);
      }
    });
    return this.currentMaxId;
  }

  getItem(index: number) {
    return this.items.slice(index, index + 1);
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
