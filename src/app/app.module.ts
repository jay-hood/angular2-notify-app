import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './shared/modules/app-routing.module';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/modules/shared.module';
import { AuthModule } from './shared/modules/auth.module';
import { CoreModule } from './shared/modules/core.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

<<<<<<< HEAD
import { DataStorageService } from './shared/services/data-storage.service';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { NoteService } from './shared/services/note.service';
=======
>>>>>>> modules
import { BulletinBoardComponent } from './bulletin-board/bulletin-board.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BulletinBoardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
