import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { Subject } from 'rxjs';

@Injectable()
export class ToDoListService {

  private currentMaxId = -1;
  listUpdated: Subject<Item[]> = new Subject<Item[]>();
  temp: Item = null;


  itemFour = new Item(5,'detail four',new Date);
  itemThree = new Item(4,'detail three',new Date,[this.itemFour]);
  itemTwo = new Item(3,'detail two',new Date,[this.itemThree]);
  itemOne = new Item(2, 'detail one', new Date, [this.itemTwo]);

  private items: Item[] = [
    new Item(1, 'test item 1', new Date(), [this.itemOne])
  ];

  getItems() {
    return this.items.slice();
  }

  deleteChildItems(index: number) {
    this.recursiveChildDelete(this.items, index);
    this.listUpdated.next(this.items.slice());
  }

  deleteItemAndShiftChildren(index: number) {
    console.log(index);
    this.recursiveChildShift(this.items, this.items[0], index);
    this.listUpdated.next(this.items.slice());
  }

  recursiveChildDelete(items: Item[], index: number) {
    items.forEach( element => {
      if (element.id === index) {
        console.log('element to be cleared reached: ' + element.id);
        // element.items = [];
        if(element.items){
          delete element.items;
        }
        return;
      } else if (element.items) {
        this.recursiveChildDelete(element.items, index);
      }
    });
  }

  // recursiveChildShift(items: Item[], oldItem: Item, index: number) {
  //   items.forEach( element => {
  //     // if the id of the element to be deleted is found
  //     if (element.id === index) {
  //     //if the deleted element is the root node
  //       if(oldItem==element){
  //         if(element.items){
  //           this.items = element.items;
  //           console.log(this.items);
  //           return;
  //         } else {
  //           this.items = [];
  //           console.log('this should be an empty array')
  //           console.log(this.items);
  //           return;
  //         }
  //
  //       }
  //       oldItem.items = element.items;
  //       return;
  //     } else if (element.items) {
  //       oldItem = element;
  //       this.recursiveChildShift(element.items, oldItem, index);
  //     }
  //   });
  // }
  recursiveChildShift(items: Item[], oldItem: Item, index: number) {
    items.forEach( item => {
      console.log('item id: ' + item.id);
      console.log('old item id: ' + oldItem.id);
      if(item.items){
        if(item.id == index){
          if(item === oldItem) {
            this.items = item.items;
          } else {
            oldItem.items.push(...item.items);
            oldItem.items.forEach( function(item, value, object) {
              if(item.id===index) {
                object.splice(value,1);
              }
            });
          }
          // console.log(`item id ${item.id} => old item id ${oldItem.id}`);
        } else {
          this.recursiveChildShift(item.items, item, index);
        }
      } else if(item.id == index) {
          oldItem.items.forEach( function(item, value, object) {
            if(item.id===index) {
              object.splice(value,1);
            }
          });
      }
    })
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
