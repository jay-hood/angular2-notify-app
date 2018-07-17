import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { Subject, Observable } from 'rxjs';
import { DataStorageService } from './data-storage.service';

@Injectable()
export class NoteService {

  // refactor at some point for angularfire2
  private currentMaxId = -1;
  listUpdated: Subject<Note[]> = new Subject<Note[]>();
  temp: Note = null;

  private notes: Note[] = [];

  getNotes() {
    return this.notes.slice();
  }

  notesPromise(): Promise<Note[]> {
    return new Promise((resolve, reject) => {
      if(this.ds.getNotes()){
        this.ds.getNotes().subscribe(res => {
          return res as Note[];
        });
      console.log(reject);
      }
    });
  }

  getNotesFromDatabase() {
    this.ds.getNotes().subscribe(res => {
      this.notes = res as Note[];
      this.listUpdated.next(this.notes.slice());
    });
  }

  storeNotesInDatabase() {
    this.ds.storeNotes(this.notes.slice());
    this.listUpdated.next(this.notes.slice());
  }

  clearNotes() {
    this.notes = new Array<Note>();
  }

  replaceNote(noteNumber: number, note: Note) {
    this.notes[noteNumber] = note;
    this.listUpdated.next(this.notes.slice());
  }

  setNotes(notes) {
    if (Array.isArray(notes)) {
      this.notes = notes;
      this.listUpdated.next(this.notes.slice());
    } else if (notes) {
      this.notes.push(notes);
      this.listUpdated.next(this.notes.slice());
    }
  }

  deleteChildNotes(index: number) {
    this.recursiveChildDelete(this.notes, index);
    this.listUpdated.next(this.notes.slice());
  }

  deleteNoteAndShiftChildren(index: number) {
    this.recursiveChildShift(this.notes, this.notes[0], index);
    this.listUpdated.next(this.notes.slice());
  }

  recursiveChildDelete(notes: Note[], index: number) {
    notes.forEach( element => {
      if (element.id === index) {
        if (element.notes) {
          delete element.notes;
        }
        return;
      } else if (element.notes) {
        this.recursiveChildDelete(element.notes, index);
      }
    });
  }

  recursiveChildShift(notes: Note[], oldnote: Note, index: number) {
    notes.forEach( note => {
      if (note.notes) {
        if (note.id === index) {
          if (note === oldnote) {
            this.notes = note.notes;
          } else {
            oldnote.notes.push(...note.notes);
            oldnote.notes.forEach( function(current, value, object) {
              if (current.id === index) {
                object.splice(value, 1);
              }
            });
          }
        } else {
          this.recursiveChildShift(note.notes, note, index);
        }
      } else if (note.id === index) {
          oldnote.notes.forEach( function(current, value, object) {
            if (current.id === index) {
              object.splice(value, 1);
            }
          });
      }
    });
  }

  getMaxId(notes: Note[]) {
    notes.forEach( element => {
      if (element.id > this.currentMaxId) {
        this.currentMaxId = element.id;
      } else if (element.notes) {
        this.getMaxId(element.notes);
      }
    });
    this.currentMaxId++;
    return this.currentMaxId;
  }


  getNote(index: number) {
    return this.notes.slice(index, index + 1);
  }

  addNote(note: Note) {
    this.notes.push(note);
    this.listUpdated.next(this.notes.slice());
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
    this.listUpdated.next(this.notes.slice());
    this.ds.storeNotes(this.notes.slice());
  }

  constructor(private ds: DataStorageService) { }
}
