import { NgModule } from '@angular/core';
import { NotesRoutingModule } from './notes-routing.module';
import { SharedModule } from './shared.module';

import { NoteDisplayComponent } from '../../notes/note-item/note-root/note-display/note-display.component';
import { NoteComponent } from '../../notes/note-item/note.component';
import { EditNoteComponent } from '../../notes/edit-note/edit-note.component';
import { NoteRootComponent } from '../../notes/note-item/note-root/note-root.component';
import { EditDetailComponent } from '../../notes/edit-note/edit-detail/edit-detail.component';


@NgModule({
  imports: [
    NotesRoutingModule,
    SharedModule,
  ],
  declarations: [
    NoteComponent,
    EditNoteComponent,
    NoteRootComponent,
    EditDetailComponent,
    NoteDisplayComponent
  ],
  providers: []
})
export class NotesModule { }
