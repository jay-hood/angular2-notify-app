import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoteService } from '../services/note.service';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../services/data-storage.service';
import { Observable, of, defer } from 'rxjs';
import { Note } from '../models/note.model';
import { dataServiceStub, notes, mockActivatedRoute } from './stubs';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EditNoteComponent } from '../../notes/edit-note/edit-note.component';

describe('EditNote Component', () => {
  let note: NoteService;
  // let auth: AuthService;
  let store: DataStorageService;
  let activatedRoute: ActivatedRoute;
  let fixture: ComponentFixture<EditNoteComponent>;
  let component: EditNoteComponent

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        NoteService,
        {provide: DataStorageService, useValue: dataServiceStub},
        {provide: ActivatedRoute, useClass: mockActivatedRoute},
      ],
      declarations: [EditNoteComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    note = TestBed.get(NoteService);
    note.setNotes([notes]);
    activatedRoute = TestBed.get(ActivatedRoute);
    fixture = TestBed.createComponent(EditNoteComponent);
    component = fixture.componentInstance;
    // runs ngOnInit and constructor functions
    // fixture.detectChanges();
  });

  it('should initialize with editMode and dataisAvailable set to true', ()=> {
    fixture.detectChanges();
    expect(component.editMode).toEqual(true);
    expect(component.dataisAvailable).toEqual(true);
  });

  it('should initialize notes from service', () => {
    fixture.detectChanges();
    expect(component.notes).toBeDefined();
  });

  it('#initArray should have been called', () => {
    spyOn(component, 'initArray');
    fixture.detectChanges();
    expect(component.initArray).toHaveBeenCalled();
  });


});
