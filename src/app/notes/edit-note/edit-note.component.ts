import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../../shared/services/note.service';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  editMode = false;
  addableGroup: FormGroup;
  dataisAvailable = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private noteService: NoteService,
    // private auth: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.editMode = params['noteNumber'] != null;
        this.noteNumber = +params['noteNumber'];
      }
    );
    if (this.editMode) {
      this.notes = this.noteService.getNote(this.noteNumber);
      if (this.notes) {
        this.noteForm = this.fb.group({
          notes: this.initArray(this.notes)
        });
        this.dataisAvailable = true;
        this.depth = 0;
      }
      this.subscription = this.noteService.listUpdated
      .subscribe(
        (notes: Note[]) => {
          this.notes = [notes[this.noteNumber]];
          this.noteForm = this.fb.group({
            notes: this.initArray(this.notes)
          });
          this.depth = 0;
        });
    } else {
      this.newnote();
    }
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  newnote() {
    this.dataisAvailable = true;
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
    const tempArray = new FormArray([]);
    notes.forEach( entry => {
      if(entry) {
        const tempnote = this.fb.group({
          id: entry.id ? entry.id : '',
          details: entry.details ? entry.details : '',
          date: entry.date ? entry.date : '',
          notes: (entry.notes && entry.notes.length!==0) ? this.initArray(entry.notes) : new FormArray([])
        });
        tempArray.push(tempnote);
      }
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
    this.noteService.storeNotesInDatabase();
    this.router.navigate(['notes', this.noteNumber]);
  }


}
