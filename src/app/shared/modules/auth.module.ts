import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PageNotFoundComponent } from '../../auth/page-not-found/page-not-found.component';
import { SignInComponent } from '../../auth/sign-in/sign-in.component';
import { SignUpComponent } from '../../auth/sign-up/sign-up.component';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
    PageNotFoundComponent,
    SignInComponent,
    SignUpComponent
  ],
  providers: []
})
export class AuthModule { }
