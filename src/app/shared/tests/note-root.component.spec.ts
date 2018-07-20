import { TestBed, tick, async, fakeAsync, inject, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { NoteService } from '../services/note.service';
import { DataStorageService } from '../services/data-storage.service';
import { NoteRootComponent } from '../../notes/note-item/note-root/note-root.component';
import { NoteComponent } from '../../notes/note-item/note.component';
import { Observable, defer, of, Subject } from 'rxjs';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Note } from '../models/note.model'
import { mockActivatedRoute } from './stubs';




let notes: Note = {
  id: 1,
  details: 'some details',
  date: new Date,
};
const dataServiceStub = {
  getNotes(): Observable<Note[]>{
    return defer(() => {
      // Promise.resolve(notes);
    })
  },
  storeNotes(bulletins){
    let myNotes = notes;
  }
};
const noteServiceStub = {
  getNote(id: number){
    return [notes];
  },
  listUpdated: of([notes])
}

describe('Bulletin-Board Service', () => {
  let fixture: ComponentFixture<NoteRootComponent>;
  let component: NoteRootComponent;
  let activatedRoute: mockActivatedRoute;
  let noteService: NoteService;
  let dropdownSpy: jasmine.SpyObj<NgbDropdownConfig>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // NoteService,
        {provide: NoteService, useValue: noteServiceStub},
        {provide: ActivatedRoute, useClass: mockActivatedRoute},
        {provide: DataStorageService, useValue: dataServiceStub}
      ],
      declarations: [NoteRootComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteRootComponent);
    activatedRoute = TestBed.get(ActivatedRoute);
    component = fixture.componentInstance;
  });

  it('should recognize 0 as the entered route parameters', async(() => {
    fixture.detectChanges();
    expect(component.routingNumber).toEqual(0);
  }));

  it('should have instantiated nsSubscription', () => {
    fixture.detectChanges();
    expect(component.nsSubscription).toBeDefined();
  });

  it('should return 123 as id value of first note', () => {
    notes.id = 123;
    fixture.detectChanges();
    expect(component.notes[0].id).toEqual(123);
  });



});
