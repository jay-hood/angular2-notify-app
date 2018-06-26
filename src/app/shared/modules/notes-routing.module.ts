import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { NoteRootComponent } from '../../notes/note-item/note-root/note-root.component';
import { NoteListComponent } from '../../notes/note-list.component';
import { EditNoteComponent } from '../../notes/edit-note/edit-note.component';
import { PlaceholderComponent } from '../placeholder/placeholder.component';
import { AuthGuardService } from '../services/auth-guard.service';

const notesRoutes: Routes = [
  {'path': '', canActivateChild: [AuthGuardService], component: NoteListComponent,
    children: [{'path': '', component: PlaceholderComponent},
               {'path': 'new', component: EditNoteComponent},
               {'path': ':noteNumber/edit', component: EditNoteComponent},
               {'path': ':noteNumber', component: NoteRootComponent}]}
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
