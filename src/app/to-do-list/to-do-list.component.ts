import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from '../shared/models/item.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ToDoListService } from '../shared/services/to-do-list.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  // @Output() itemSelectedEvent = new EventEmitter<Item>();
  items: Item[];
  index: number;
  private subscription: Subscription;

  constructor(
    private toDoListService: ToDoListService,
    private router: Router) {

    }

  onPanelChange(event: NgbPanelChangeEvent) {
    // this.itemSelectedEvent.emit(this.toDoListService.getItem(+event.panelId));
    this.index = +event.panelId;
    // Need some way of giving a warning when navigating between panels if
    // the user is in the middle of editing.
    this.router.navigate(['item', this.index]);
  }

  onDelete() {
    this.toDoListService.deleteItem(this.index);
    this.router.navigate(['']);
  }

  onEdit() {
    console.log('edit button clicked');
    this.router.navigate(['item/edit', this.index]);
  }

  onAddItem() {
    console.log('add item button clicked');
    this.router.navigate(['new']);
  }

  ngOnInit() {
    this.items = this.toDoListService.getItems();
    this.subscription = this.toDoListService.listUpdated.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    );
  }


}
