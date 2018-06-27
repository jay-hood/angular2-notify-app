import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaceholderComponent } from '../placeholder/placeholder.component';
import { ResizeDirective } from '../directives/resize.directive';
import { DropdownDirective } from '../directives/dropdown.directive';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    PlaceholderComponent,
    ResizeDirective,
    DropdownDirective
  ],
  exports: [
    PlaceholderComponent,
    ResizeDirective,
    DropdownDirective,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: []
})
export class SharedModule { }
