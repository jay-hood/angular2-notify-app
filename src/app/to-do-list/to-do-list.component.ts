import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/models/item.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  itemForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.itemForm = new FormGroup({
      description: new FormControl()
    });
  }


}
