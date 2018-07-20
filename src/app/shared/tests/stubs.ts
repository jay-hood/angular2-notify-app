import { Observable, of, defer, Subscription } from 'rxjs';
import { Note } from '../models/note.model';

export class mockActivatedRoute {
  params = of({noteNumber: '0'});
}

export const notes: Note = {
  id: 1,
  details: 'some details',
  date: new Date,
};
export const dataServiceStub = {
  getNotes(): Observable<Note[]>{
    return defer(() => {
      // Promise.resolve(notes);
    })
  },
  storeNotes(bulletins){
    let myNotes = notes;
  }
};
