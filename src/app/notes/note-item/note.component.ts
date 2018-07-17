import { Component, Input } from '@angular/core';
import { NoteService } from '../../shared/services/note.service';
import { Note } from '../../shared/models/note.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Response } from '@angular/http';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input() notes: Note[] = [];
  @Input() prevNote: Note;
  @Input() editMode: boolean;
  @Input() isCollapsed = false;


  nextCollapse = false;
  creationNumber: number;
  listSubscription: Subscription;
  constructor(
    private ns: NoteService,
    private config: NgbDropdownConfig) {
      this.config.placement = 'right';
  }


  onDelete(index: number) {
    this.ns.deleteNoteAndShiftChildren(index);
  }

  onDeleteChildren(index: number) {
    this.ns.deleteChildNotes(index);
  }


}
