import { Component, OnInit, Input } from '@angular/core';
import { ToDoListService } from '../../shared/services/to-do-list.service';
import { Item } from '../../shared/models/item.model';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.css'],
  providers: [ToDoListService]
})
export class ToDoItemComponent implements OnInit {

  item: Item;

  constructor(private route: ActivatedRoute,
    private toDoListService: ToDoListService) { }

  ngOnInit() {
    this.item = this.toDoListService
    .getItem(+this.route.snapshot.params['itemNumber']);

    this.route.params.subscribe(
      (params: Params) => {
        this.item = this.toDoListService
        .getItem(+this.route.snapshot.params['itemNumber']);
      }
    )

  }

}
