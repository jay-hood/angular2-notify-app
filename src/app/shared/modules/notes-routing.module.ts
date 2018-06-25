import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoteRootComponent } from '../../notes/note-item/note-root/note-root.component';
import { NoteDisplayComponent } from '../../notes/note-item/note-root/note-display/note-display.component';
import { EditNoteComponent } from '../../notes/edit-note/edit-note.component';
import { PlaceholderComponent } from '../placeholder/placeholder.component';

const notesRoutes: Routes = [
  {'path': 'note/new', component: EditNoteComponent},
  {'path': 'note', component: NoteRootComponent,
    children: [{'path': '', component: PlaceholderComponent},
               {'path': ':noteNumber', component: NoteDisplayComponent},
               {'path': ':noteNumber/edit', component: EditNoteComponent}]}
];

@NgModule({
  imports: [
    RouterModule.forChild(notesRoutes)
  ],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class NotesRoutingModule { }
