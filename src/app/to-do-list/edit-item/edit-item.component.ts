import { Component, OnInit } from '@angular/core';
import { FormArray, NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDoListService } from '../../shared/services/to-do-list.service';
import { DataStorageService } from '../../shared/services/data-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../shared/models/item.model';
import { Response } from '@angular/http';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  itemNumber: number;
  itemForm: FormGroup;
  items: Item[];
  depth: number;
  editMode = false;
  addableGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private list: ToDoListService,
    private ds: DataStorageService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.itemNumber = +params['itemNumber'];
        this.editMode = params['itemNumber'] != null;
      }
    );
    if (this.editMode) {
      this.items = this.list.getItem(this.itemNumber);
      this.list.listUpdated.subscribe(
        (items: Item[]) => {
          this.items[0] = items[this.itemNumber];
        });
      this.itemForm = this.fb.group({
        items: this.initArray(this.items)
      });
      this.depth = 0;
    } else {
      this.newItem();
    }
  }

  newItem() {
    this.depth = 0;
    this.itemForm = this.fb.group({
      items: new FormArray([this.fb.group({
        details: '',
        items: new FormArray([])
      })])
    });
  }



  initArray(items: Item[]): FormArray {
    const tempArray = new FormArray([]);
    items.forEach( item => {
      const tempItem = this.fb.group({
        details: item.details,
        items: item.items ? this.initArray(item.items) : []
      });
      tempArray.push(tempItem);
    });
    return tempArray;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    // this doesn't actually work
    if (this.editMode) {
      const tempItem = form.value.items[0];
      this.list.replaceItem(this.itemNumber, tempItem);
    } else {
      this.list.addItem(form.value.items[0]);
    }
    this.ds.storeNotes().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }


}
