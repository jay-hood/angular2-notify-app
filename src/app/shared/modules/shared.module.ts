import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaceholderComponent } from '../placeholder/placeholder.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    PlaceholderComponent
  ],
  exports: [
    PlaceholderComponent,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: []
})
export class SharedModule { }
