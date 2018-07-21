import { Observable, of, defer, Subscription } from 'rxjs';
import { Note } from '../models/note.model';

export class mockActivatedRoute {
  params = of({noteNumber: '0'});
}

export let authState = {
  email: 'test@test.com',
  password: 'testpassword',
  loggedin: false
}

export const mockFireAuth = {
  afAuth: {auth: jasmine.createSpyObj('auth',{
      'signInWithEmailAndPassword': Promise.resolve('authstate set')
    })},
  authState: of(authState),
  isAuthenticated: false,
  loadUser: () => {
    authState.email = 'loaded email'
  }
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
