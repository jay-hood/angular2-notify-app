import { Component, Input } from '@angular/core';
import { Item } from '../../shared/models/item.model';

@Component({
  selector: 'app-item-tree-view',
  templateUrl: 'item-tree-view.component.html'
})

export class ItemTreeViewComponent{

  @Input() items: Array<Item>;



}
