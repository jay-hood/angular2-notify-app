import { Component, OnInit } from '@angular/core';
import { Item } from '../../shared/models/item.model';
import { ToDoListService } from '../../shared/services/to-do-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(private toDoListService: ToDoListService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    // const newItem = new Item(value.title, new Date(), value.details);
    // this.toDoListService.addItem(newItem);
    form.reset();
  }

}
