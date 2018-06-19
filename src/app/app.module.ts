import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { AppRoutingModule } from './shared/modules/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToDoListService } from './shared/services/to-do-list.service';
import { AppComponent } from './app.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ToDoItemComponent } from './to-do-list/to-do-item/to-do-item.component';
import { HeaderComponent } from './header/header.component';
import { PlaceholderComponent } from './shared/placeholder/placeholder.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditItemComponent } from './to-do-list/edit-item/edit-item.component';
import { ItemRootComponent } from './to-do-list/to-do-item/item-root/item-root.component';
import { EditDetailComponent } from './to-do-list/edit-item/edit-detail/edit-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    ToDoItemComponent,
    HeaderComponent,
    PlaceholderComponent,
    DropdownDirective,
    EditItemComponent,
    ItemRootComponent,
    EditDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [ToDoListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
