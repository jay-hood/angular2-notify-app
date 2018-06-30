import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './shared/modules/app-routing.module';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/modules/shared.module';
import { AuthModule } from './shared/modules/auth.module';
import { CoreModule } from './shared/modules/core.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { BulletinBoardComponent } from './bulletin-board/bulletin-board.component';
import { BulletinComponent } from './bulletin-board/bulletin/bulletin.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BulletinBoardComponent,
    BulletinComponent
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
