import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoteService } from '../services/note.service';
import { DataStorageService } from '../services/data-storage.service';
import { Observable, of, defer } from 'rxjs';
import { Note } from '../models/note.model';
import { notes, dataServiceStub, mockActivatedRoute } from './stubs';
import { FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { EditDetailComponent } from '../../notes/edit-note/edit-detail/edit-detail.component';
import { EditNoteComponent } from '../../notes/edit-note/edit-note.component';

describe('EditDetail Component', () => {
  let note: NoteService;
  // let auth: AuthService;
  // let store: DataStorageService;
  // let activatedRoute: ActivatedRoute;
  let detailFixture: ComponentFixture<EditDetailComponent>;
  let editDetail: EditDetailComponent
  let noteFixture: ComponentFixture<EditNoteComponent>;
  let editNote: EditNoteComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        NoteService,
        {provide: DataStorageService, useValue: dataServiceStub},
        {provide: ActivatedRoute, useClass: mockActivatedRoute},
      ],
      declarations: [EditNoteComponent, EditDetailComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    note = TestBed.get(NoteService);
    note.setNotes([notes]);
    // activatedRoute = TestBed.get(ActivatedRoute);
    detailFixture = TestBed.createComponent(EditDetailComponent);
    noteFixture = TestBed.createComponent(EditNoteComponent);
    editDetail = detailFixture.componentInstance;
    editNote = noteFixture.componentInstance;
    let formArray = editNote.initArray([notes]);
    let formGroup = formArray.controls[0];
    editDetail.noteForm = formGroup as FormGroup;
    editDetail.noteFormArray = null;
    editDetail.depth = 0;
    editDetail.editMode = true;
    // runs ngOnInit and constructor functions
    // fixture.detectChanges();
  });

  it('should have textarea content initialize with test details', () => {
    detailFixture.detectChanges();
    detailFixture.whenStable().then(() => {
      let detailElement = detailFixture.debugElement.nativeElement;
      const textArea = detailElement.querySelector('textarea');
      expect(textArea.value).toBe('some details');
    });
  });

  it('should give the textarea a border-color of rgb(246, 0, 153)', () => {
    editDetail.depth = 5;
    detailFixture.detectChanges();
    let detailElement = detailFixture.debugElement.nativeElement;
    const textArea = detailElement.querySelector('textarea');
    expect(textArea.style.borderColor).toBe('rgb(246, 0, 153)');
  });

  it('should not display delete button', () => {
    let detailElement = detailFixture.debugElement.nativeElement;
    const del = detailElement.querySelector('#delete');
    const add = detailElement.querySelector('#addChild');
    expect(del).toBeNull();
  });

  it('should display add button', () => {
    let detailElement = detailFixture.debugElement.nativeElement;
    const add = detailElement.querySelector('#addChild');
    expect(add).not.toBeNull();
  })



});
