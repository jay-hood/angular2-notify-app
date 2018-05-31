import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { AppRoutingModule } from './shared/modules/app-routing.module';

import { AppComponent } from './app.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ToDoItemComponent } from './to-do-list/to-do-item/to-do-item.component';
import { AddItemComponent } from './to-do-list/add-item/add-item.component';
import { EditListComponent } from './to-do-list/edit-list/edit-list.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToDoItemListComponent } from './to-do-list/to-do-item-list/to-do-item-list.component';
import { PlaceholderComponent } from './shared/placeholder/placeholder.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    ToDoItemComponent,
    AddItemComponent,
    EditListComponent,
    HeaderComponent,
    SidebarComponent,
    ToDoItemListComponent,
    PlaceholderComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
