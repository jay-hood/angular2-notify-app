import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, PreloadAllModules } from '@angular/router';
import { ToDoListComponent } from '../../to-do-list/to-do-list.component';
import { ToDoItemComponent } from '../../to-do-list/to-do-item/to-do-item.component';
import { PlaceholderComponent } from '../placeholder/placeholder.component';
import { EditItemComponent } from '../../to-do-list/edit-item/edit-item.component';

const appRoutes: Routes = [
  {'path': '', component: PlaceholderComponent},
  {'path': 'item/:itemNumber', component: ToDoItemComponent},
  {'path': 'item/edit/:itemNumber', component: EditItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class AppRoutingModule { }
