import { Component} from '@angular/core';

@Component({
  selector: 'app-note-root',
  templateUrl: 'note-root.component.html'
})
export class NoteRootComponent {

  // notes: Note[] = [];
  // routingNumber: number;
  // editMode = false;
  // editModeStr: string;
  // nsSubscription: Subscription;
  //
  //
  constructor() {

  }
  //
  // editToggle() {
  //   this.editMode = !this.editMode;
  //   if (this.editMode) {
  //     this.editModeStr = 'ON';
  //   } else {
  //     this.editModeStr = 'OFF';
  //   }
  // }
  //
  // ngOnInit() {
  //   this.editModeStr = 'OFF';
  //   this.route.params.subscribe(
  //     params => {
  //       this.routingNumber = +params['noteNumber'];
  //       this.notes = this.ns.getNote(this.routingNumber);
  //       console.log(this.routingNumber);
  //     }
  //   );
  //   this.nsSubscription = this.ns.listUpdated.subscribe(
  //     (notes: Note[]) => {
  //       this.notes = notes.slice(this.routingNumber, this.routingNumber + 1);
  //     }
  //   );
  // }


}
