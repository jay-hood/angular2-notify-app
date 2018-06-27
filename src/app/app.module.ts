import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/modules/shared.module';
import { AuthModule } from './shared/modules/auth.module';
import { CoreModule } from './shared/modules/core.module';

import { AppRoutingModule } from './shared/modules/app-routing.module';

import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
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
