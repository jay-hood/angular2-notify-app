import { NgModule } from '@angular/core';
import { NotesRoutingModule } from './notes-routing.module';
import { SharedModule } from './shared.module';

import { NoteComponent } from '../../notes/note-item/note.component';
import { NoteListComponent } from '../../notes/note-list.component';
import { NoteRootComponent } from '../../notes/note-item/note-root/note-root.component';
import { EditNoteComponent } from '../../notes/edit-note/edit-note.component';
import { EditDetailComponent } from '../../notes/edit-note/edit-detail/edit-detail.component';


@NgModule({
  imports: [
    NotesRoutingModule,
    SharedModule,
  ],
  declarations: [
    NoteListComponent,
    NoteComponent,
    NoteRootComponent,
    EditNoteComponent,
    EditDetailComponent
  ],
  providers: []
})
export class NotesModule { }
