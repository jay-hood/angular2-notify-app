import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from '../shared/models/item.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ToDoListService } from '../shared/services/to-do-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
  providers: [ToDoListService]
})
export class ToDoListComponent implements OnInit {

  items: Item[];
  private subscription: Subscription;

  constructor(private toDoListService : ToDoListService) { }

  ngOnInit() {
    this.items = this.toDoListService.getItems();
    this.subscription = this.toDoListService.listUpdated.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    )
  }

  onRetrieve() {
    this.items = this.toDoListService.getItems();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
