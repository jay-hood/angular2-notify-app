import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { AppRoutingModule } from './shared/modules/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { NoteService } from './shared/services/note.service';
import { DataStorageService } from './shared/services/data-storage.service';
import { AuthService } from './shared/services/auth.service';

import { AppComponent } from './app.component';
import { NoteListComponent } from './notes/note-list.component';
import { NoteComponent } from './notes/note-item/note.component';
import { HeaderComponent } from './header/header.component';
import { PlaceholderComponent } from './shared/placeholder/placeholder.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { EditNoteComponent } from './notes/edit-note/edit-note.component';
import { NoteRootComponent } from './notes/note-item/note-root/note-root.component';
import { EditDetailComponent } from './notes/edit-note/edit-detail/edit-detail.component';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteComponent,
    HeaderComponent,
    PlaceholderComponent,
    DropdownDirective,
    EditNoteComponent,
    NoteRootComponent,
    EditDetailComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [NoteService, DataStorageService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
