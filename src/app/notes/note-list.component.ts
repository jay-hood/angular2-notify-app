import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http';
import { Note } from '../shared/models/note.model';
import { FormGroup, FormControl } from '@angular/forms';
import { NoteService } from '../shared/services/note.service';
import { DataStorageService } from '../shared/services/data-storage.service';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  // @Output() noteSelectedEvent = new EventEmitter<Note>();
  notes: Note[];
  index: number;
  private signInSubscription: Subscription;
  private subscription: Subscription;

  constructor(
    private ns: NoteService,
    private router: Router,
    private auth: AuthService,
    private ds: DataStorageService) {

    }

  onPanelChange(event: NgbPanelChangeEvent) {
    // this.noteSelectedEvent.emit(this.ns.getNote(+event.panelId));
    this.index = +event.panelId;
    // Need some way of giving a warning when navigating between panels if
    // the user is in the middle of editing.
    this.router.navigate(['notes', this.index]);
    console.log(this.notes[this.index]);
  }

  onDelete() {
    this.ns.deleteNote(this.index);
    this.ds.storeNotes().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
    this.router.navigate(['']);
  }

  onEdit() {
    this.router.navigate(['notes', this.index, 'edit']);
  }

  onAddNote() {
    this.router.navigate(['notes/new']);
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.ds.getNotes();
    }
    this.signInSubscription = this.auth.signedIn.subscribe(
      status => {
        if (status) {
          this.ds.getNotes();
          this.notes = this.ns.getNotes();
        }
      }
    );
    this.subscription = this.ns.listUpdated.subscribe(
      (notes: Note[]) => {
        this.notes = notes;
      }
    );
  }


}
