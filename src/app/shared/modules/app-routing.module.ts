import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, PreloadAllModules } from '@angular/router';
import { NoteListComponent } from '../../notes/note-list.component';
import { NoteComponent } from '../../notes/note-item/note.component';
import { NoteRootComponent } from '../../notes/note-item/note-root/note-root.component';
import { NoteDisplayComponent } from '../../notes/note-item/note-root/note-display/note-display.component';
import { PlaceholderComponent } from '../placeholder/placeholder.component';
import { EditNoteComponent } from '../../notes/edit-note/edit-note.component';


const appRoutes: Routes = [
  {'path': '', component: PlaceholderComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class AppRoutingModule { }
