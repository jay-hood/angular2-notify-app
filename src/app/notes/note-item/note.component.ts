import { Component, Input } from '@angular/core';
import { NoteService } from '../../shared/services/note.service';
import { DataStorageService } from '../../shared/services/data-storage.service';
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
    private config: NgbDropdownConfig,
    private ds: DataStorageService) {
      this.config.placement = 'right';
      console.log('note intantiated');
      // this.creationNumber = this.list.getCreationNumber();
      // this.list.incrementCreationNumber();
      // this.isCollapsed = true;
  }


  onDelete(index: number) {
    this.ns.deleteNoteAndShiftChildren(index);
    this.ds.storeNotes().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  onDeleteChildren(index: number) {
    this.ns.deleteChildNotes(index);
    this.ds.storeNotes().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
    console.log(index);
  }


}
