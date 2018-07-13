import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
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

  set currentUser(user) {}

  get currentUserIdToken(): any {
    return this.afAuth.idToken;
  }

  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  get currentUserId(): any {
    console.log(this.authState.uid);
    return this.isAuthenticated ? this.authState.uid : '';
  }

  get currentUserEmail(): any {
    if (this.authState) {
      return this.authState.email;
    }
  }

  signinUser(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      res => {
        console.log(res);
        this.authState = res;
        // this.updateUserData(password);
        this.signedIn.next(true);
        this.router.navigate(['']);
      }, rej => console.log(rej));
  }

  signoutUser() {
    this.afAuth.auth.signOut();
    this.signedIn.next(false);
    this.router.navigate(['']);
  }

  signUpUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      res => {
        this.authState = res;
        // this.updateUserData(password);
      }).catch(error => console.log(error));
  }

  // updateUserData(password: string) {
  //   const path = `${this.currentUserId}/notes`;
  //   console.log(path);
  //   console.log(this.authState.user.email);
  //   const data = {
  //     email: this.authState.user.email,
  //     password: password
  //   };
  //   this.db.object(path).update(data).catch(error => console.log(error));
  // }

  loadUser() {
    this.afAuth.authState.subscribe(user => {
      if (user && user.uid) {
        console.log(user);
        this.authState = user;
        this.signedIn.next(true);
        // const ident = JSON.parse(JSON.stringify(user.uid));
        // this.db.object(`${ident}/notes`).update(user)
        //   .catch(error => console.log(error));
        // // this.currentUser = user;
      }
    });
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
