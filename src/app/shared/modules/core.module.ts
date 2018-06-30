import { NgModule } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { AuthService } from '../services/auth.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { NoteService } from '../services/note.service';
import { BulletinBoardService } from '../services/bulletin-board.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    DataStorageService,
    AuthService,
    AuthGuardService,
    NoteService,
    BulletinBoardService
  ]
})
export class CoreModule { }
