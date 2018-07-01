import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataStorageService } from './data-storage.service';
import { NoteService } from './note.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/* The vast majority of this code was adapted from Jeff Delaney's auth.service
file template for firebase users.
*/

@Injectable()
export class AuthService {
  signedIn: Subject<boolean> = new Subject<boolean>();
  authState: any = null;
  // signVal = false;
  // token: Observable<string>;
  // redirectURL: string;
  // userId: string;
  // currentUserEmail: string;

  constructor(
    private router: Router,
    private ns: NoteService,
    public db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  get isAuthenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
    return this.isAuthenticated ? this.authState : null;
  }

  get currentUserIdToken(): any {
    return this.afAuth.idToken;
  }

  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  get currentUserId(): any {
    return this.isAuthenticated ? this.authState.uid : '';
  }

  signinUser(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      res => {
        this.authState = res;
        this.updateUserData();
        this.router.navigate(['']);
      });
  }

  signoutUser() {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }

  signUpUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      res => {
        this.authState = res;
        this.updateUserData();
      }).catch(error => console.log(error));
  }

  updateUserData() {
    const path = `${this.currentUserId}/notes`;
    const data = {
      email: this.authState.email,
      password: this.authState.password
    };
    this.db.object(path).update(data).catch(error => console.log(error));
  }

  //
  // loadUser() {
  //   firebase.auth().onAuthStateChanged((currentUser) => {
  //       if (currentUser === null) {
  //           this.token = null;
  //       } else {
  //           this.userId = currentUser.uid;
  //           this.currentUserEmail = currentUser.email;
  //           currentUser.getIdToken().then(
  //               (token: string) => {
  //                 this.token = token;
  //                 this.signedIn.next(true);
  //                 if (this.redirectURL) {
  //                   this.router.navigate([this.redirectURL]);
  //                 }
  //               }
  //           );
  //       }
  //   });
  // }


  // signinUser(email: string, password: string) {
  //   firebase.auth().signInWithEmailAndPassword(email, password)
  //     .then(
  //       response => {
  //         this.router.navigate(['']);
  //         firebase.auth().currentUser.getIdToken().then(
  //           (token: string) => {
  //             this.userId = firebase.auth().currentUser.uid;
  //             this.currentUserEmail = firebase.auth().currentUser.email;
  //             this.token = token;
  //             this.signVal = true;
  //             this.signedIn.next(this.signVal);
  //           }
  //         );
  //       }
  //     ).catch(
  //       error => console.log(error)
  //     );
  // }
  // signupUser(email: string, password: string) {
  //   firebase.auth().createUserWithEmailAndPassword(email, password)
  //     .then(
  //       response => {
  //         this.router.navigate(['']);
  //       }
  //     ).catch(
  //       error => console.log(error)
  //     );
  // }
  //
  // signoutUser() {
  //   firebase.auth().signOut();
  //   this.signVal = false;
  //   this.signedIn.next(this.signVal);
  //   this.ns.clearNotes();
  //   this.router.navigate(['']);
  // }
  //
  // getUserStatus() {
  //   return this.signVal;
  // }
  //
  //
  // isAuthenticated(): boolean {
  //   return this.token != null;
  // }
  //
  // getToken() {
  //   firebase.auth().currentUser.getIdToken().then(
  //     (token: string) => this.token = token
  //   );
  //   return this.token;
  // }
}
