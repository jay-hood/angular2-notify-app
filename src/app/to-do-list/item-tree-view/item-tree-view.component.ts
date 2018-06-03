import { Component, Input } from '@angular/core';
import { Details } from '../../shared/models/details.model';

@Component({
  selector: 'app-item-tree-view',
  templateUrl: 'item-tree-view.component.html'
})

export class ItemTreeViewComponent{

  @Input() details: Array<Details>;



}
