import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../../../shared/models/note.model';
import { NoteService } from '../../../shared/services/note.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note-root',
  templateUrl: 'note-root.component.html'
})
export class NoteRootComponent implements OnInit {

  notes: Note[] = [];
  routingNumber: number;
  editMode = false;
  editModeStr: string;
  nsSubscription: Subscription;


  constructor(
    private route: ActivatedRoute,
    private ns: NoteService
  ) {}

  editToggle() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.editModeStr = 'ON';
    } else {
      this.editModeStr = 'OFF';
    }
  }

  ngOnInit() {
    this.editModeStr = 'OFF';
    this.route.params.subscribe(
      params => {
        this.routingNumber = +params['noteNumber'];
        this.notes = this.ns.getNote(this.routingNumber);
      }
    );
    this.nsSubscription = this.ns.listUpdated.subscribe(
      (notes: Note[]) => {
        this.notes = notes.slice(this.routingNumber, this.routingNumber + 1);
      }
    );
  }


}
