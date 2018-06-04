import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToDoListService } from '../../shared/services/to-do-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  itemNumber: number;
  editMode = false;
  itemForm: FormGroup

  constructor(private route: ActivatedRoute, private toDoListService: ToDoListService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.itemNumber = +params['itemNumber'];
        this.editMode = params['itemNumber'] != null;
        this.initializeForm();
      }
    );
  }

  onSubmit(){

  }

  onClear() {
    this.itemForm = new FormGroup({
      details: new FormControl('', Validators.maxLength(300))
    })
  }

  initializeForm() {

    const item = this.toDoListService.getItem(this.itemNumber);
    //Creating a form array to contain nested detail properties is going
    //to be a very interesting endeavor
    if(this.editMode){
      const itemForm = new FormGroup({
        details: new FormControl(item.details, Validators.maxLength(300))
      });
      this.itemForm = itemForm;
    }

  }

}
