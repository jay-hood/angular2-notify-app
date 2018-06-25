import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './shared/modules/app-routing.module';
import { HttpModule } from '@angular/http';
import { NotesModule } from './shared/modules/notes.module';
import { SharedModule } from './shared/modules/shared.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PlaceholderComponent } from './shared/placeholder/placeholder.component';
import { SignInComponent } from './sign-in/sign-in.component';

import { DataStorageService } from './shared/services/data-storage.service';
import { AuthService } from './shared/services/auth.service';
import { NoteService } from './shared/services/note.service';

import { DropdownDirective } from './shared/directives/dropdown.directive';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlaceholderComponent,
    DropdownDirective,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NotesModule,
    SharedModule,
  ],
  providers: [NoteService, DataStorageService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
