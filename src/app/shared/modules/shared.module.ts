import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoteListComponent } from '../../notes/note-list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  declarations: [
    NoteListComponent
  ],
  exports: [
    NoteListComponent,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: []
})
export class SharedModule { }
