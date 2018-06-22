import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDoListService } from '../../shared/services/to-do-list.service';
import { DataStorageService } from '../../shared/services/data-storage.service';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../shared/models/item.model';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit, OnDestroy {

  itemNumber: number;
  private subscription: Subscription;
  itemForm: FormGroup;
  items: Item[] = [];
  depth: number;
  editMode = true;
  addableGroup: FormGroup;
  dataisAvailable = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private list: ToDoListService,
    private auth: AuthService,
    private ds: DataStorageService) {

    }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.editMode = params['itemNumber'] != null;
        this.itemNumber = +params['itemNumber'];
        // if (this.auth.isAuthenticated()) {
        //     this.ds.getNotes();
        // }
      }
    );
    console.log(this.editMode);
    if (this.editMode) {
      this.items = this.list.getItem(this.itemNumber);
      if (this.items) {
        this.itemForm = this.fb.group({
          items: this.initArray(this.items)
        });
        this.dataisAvailable = true;
        this.depth = 0;
      }
      console.log(this.items);
      console.log(this.itemForm);
      this.subscription = this.list.listUpdated.subscribe(
        (items: Item[]) => {
          console.log('does it get here?');
          this.items = [items[this.itemNumber]];
          this.itemForm = this.fb.group({
            items: this.initArray(this.items)
          });
          console.log(this.dataisAvailable);
          console.log(this.itemForm);
          this.depth = 0;
        });
      console.log('does it get here?');
    } else {
      this.newItem();
    }
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  newItem() {
    this.depth = 0;
    this.itemForm = this.fb.group({
      items: new FormArray([this.fb.group({
        id: this.list.getMaxId(this.list.getItems()),
        details: '',
        date: new Date(),
        items: new FormArray([])
      })])
    });
  }



  initArray(items: Item[]): FormArray {
    console.log(items);
    const tempArray = new FormArray([]);
    items.forEach( item => {
      const tempItem = this.fb.group({
        id: item.id,
        details: item.details,
        date: item.date,
        items: item.items ? this.initArray(item.items) : new FormArray([])
      });
      tempArray.push(tempItem);
    });
    return tempArray;
  }

  onSubmit(form: NgForm) {
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
