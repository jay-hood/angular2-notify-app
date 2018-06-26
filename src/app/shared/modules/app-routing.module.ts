import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, PreloadAllModules } from '@angular/router';
import { PlaceholderComponent } from '../placeholder/placeholder.component';
import { SignInComponent } from '../../auth/sign-in/sign-in.component';
import { SignUpComponent } from '../../auth/sign-up/sign-up.component';
import { PageNotFoundComponent } from '../../auth/page-not-found/page-not-found.component';
import { AuthGuardService } from '../services/auth-guard.service';

const appRoutes: Routes = [
  {path: '', component: PlaceholderComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'notes', canActivate: [AuthGuardService], loadChildren: './notes.module#NotesModule'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class AppRoutingModule { }
