import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../../shared/services/note.service';
import { DataStorageService } from '../../shared/services/data-storage.service';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../../shared/models/note.model';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit, OnDestroy {

  noteNumber: number;
  private subscription: Subscription;
  noteForm: FormGroup;
  notes: Note[] = [];
  depth: number;
  editMode = true;
  addableGroup: FormGroup;
  dataisAvailable = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private noteService: NoteService,
    private auth: AuthService,
    private ds: DataStorageService) {

    }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.editMode = params['noteNumber'] != null;
        this.noteNumber = +params['noteNumber'];
        // if (this.auth.isAuthenticated()) {
        //     this.ds.getNotes();
        // }
      }
    );
    console.log(this.editMode);
    if (this.editMode) {
      this.notes = this.noteService.getNote(this.noteNumber);
      if (this.notes) {
        this.noteForm = this.fb.group({
          notes: this.initArray(this.notes)
        });
        this.dataisAvailable = true;
        this.depth = 0;
      }
      console.log(this.notes);
      console.log(this.noteForm);
      this.subscription = this.noteService.listUpdated.subscribe(
        (notes: Note[]) => {
          console.log('does it get here?');
          this.notes = [notes[this.noteNumber]];
          this.noteForm = this.fb.group({
            notes: this.initArray(this.notes)
          });
          console.log(this.dataisAvailable);
          console.log(this.noteForm);
          this.depth = 0;
        });
      console.log('does it get here?');
    } else {
      this.newnote();
    }
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  newnote() {
    this.depth = 0;
    this.noteForm = this.fb.group({
      notes: new FormArray([this.fb.group({
        id: this.noteService.getMaxId(this.noteService.getNotes()),
        details: '',
        date: new Date(),
        notes: new FormArray([])
      })])
    });
  }



  initArray(notes: Note[]): FormArray {
    console.log(notes);
    const tempArray = new FormArray([]);
    notes.forEach( entry => {
      const tempnote = this.fb.group({
        id: entry.id,
        details: entry.details,
        date: entry.date,
        notes: entry.notes ? this.initArray(entry.notes) : new FormArray([])
      });
      tempArray.push(tempnote);
    });
    return tempArray;
  }

  onSubmit(form: NgForm) {
    // this doesn't actually work
    if (this.editMode) {
      const tempnote = form.value.notes[0];
      this.noteService.replaceNote(this.noteNumber, tempnote);
    } else {
      this.noteService.addNote(form.value.notes[0]);
    }
    this.ds.storeNotes().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }


}