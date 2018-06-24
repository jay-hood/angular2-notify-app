import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, PreloadAllModules } from '@angular/router';
import { NoteListComponent } from '../../notes/note-list.component';
import { NoteComponent } from '../../notes/note-item/note.component';
import { NoteRootComponent } from '../../notes/note-item/note-root/note-root.component';
import { PlaceholderComponent } from '../placeholder/placeholder.component';
import { EditNoteComponent } from '../../notes/edit-note/edit-note.component';


const appRoutes: Routes = [
  {'path': '', component: PlaceholderComponent, pathMatch: 'full'},
  {'path': 'note/new', component: EditNoteComponent},
  {'path': 'note/:noteNumber/edit', component: EditNoteComponent},
  {'path': 'note/:noteNumber', component: NoteRootComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class AppRoutingModule { }
