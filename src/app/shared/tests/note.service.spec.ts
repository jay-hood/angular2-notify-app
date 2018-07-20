import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoteService } from '../services/note.service';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../services/data-storage.service';
import { Observable, of, defer, Subscription } from 'rxjs';
import { Note } from '../models/note.model';
import { dataServiceStub, notes } from './stubs';

describe('Note Service', () => {
  let noteService: NoteService;
  // let auth: AuthService;
  let store: DataStorageService;
  let tempNotes: Note;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        NoteService,
        {provide: DataStorageService, useValue: dataServiceStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    noteService = TestBed.get(NoteService);
    noteService.setNotes(notes);
    tempNotes = {...notes};
    tempNotes.id = 123;
  });

  it('#setNotes should return set content of note array', () => {
    spyOn(noteService, 'setNotes');
    noteService.setNotes(tempNotes);
    noteService.listUpdated.subscribe(res => {
      expect(noteService.setNotes).toHaveBeenCalled();
      expect(res[0].id).toEqual(123);
    });
  });

  it('#clearNotes should return an empty array', () => {
    spyOn(noteService, 'clearNotes');
    noteService.clearNotes();
    noteService.listUpdated.subscribe(res => {
      expect(noteService.clearNotes).toHaveBeenCalled();
      expect(res).toEqual([]);
    });
  });

  it('#replaceNote should replace the existing note', () => {
    spyOn(noteService, 'replaceNote');
    noteService.replaceNote(0, tempNotes);
    noteService.listUpdated.subscribe(res => {
      expect(noteService.clearNotes).toHaveBeenCalled();
      expect(res).toEqual([tempNotes]);
    });
  });

  it('#getNotes should get notes', () => {
    expect(noteService.getNotes()).toEqual([notes]);
  });

  it('#deleteChildNotes should delete contents of specified array', () => {
    let tempNotesTwo = {...notes};
    tempNotesTwo.id = 2;
    tempNotes.notes = [tempNotesTwo];
    spyOn(noteService, 'deleteChildNotes');
    noteService.deleteChildNotes(0);
    noteService.listUpdated.subscribe(res => {
      expect(noteService.recursiveChildDelete).toHaveBeenCalled();
      expect(res[0].notes).toEqual([]);
    });
  });

  it('#deleteNoteAndShiftChildren should cause a recursiveChildShift', () => {
    let tempNotesTwo = {...notes};
    tempNotesTwo.id = 2;
    tempNotes.notes = [tempNotesTwo];
    spyOn(noteService, 'deleteChildNotes');
    noteService.deleteNoteAndShiftChildren(0);
    noteService.listUpdated.subscribe(res => {
      expect(noteService.recursiveChildShift).toHaveBeenCalled();
      expect(res[0].notes).toEqual([tempNotesTwo]);
    });
  });

  it('#deleteNote should produce empty array', () => {
    spyOn(noteService, 'deleteNote');
    noteService.deleteNote(0);
    noteService.listUpdated.subscribe(res => {
      expect(noteService.deleteNote).toHaveBeenCalled();
      expect(res).toEqual([]);
    });
  });

});
