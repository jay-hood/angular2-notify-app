import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
  redirectURL: string;


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
        this.authState = res;
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
        if(this.redirectURL){
          this.router.navigate([this.redirectURL]);
        }
      }
    });
  }

}
