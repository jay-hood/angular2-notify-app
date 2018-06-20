import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  signedIn: Subject<boolean> = new Subject<boolean>();
  signVal = false;
  token: string;
  constructor() {
    // firebase.auth().onAuthStateChanged(function(user) {
    //
    // });
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          firebase.auth().currentUser.getIdToken().then(
            (token: string) => {
              this.token = token;
              this.signVal = true;
              this.signedIn.next(this.signVal);
              localStorage.setItem('user', firebase.auth().currentUser.uid);
              this.signVal = true;
            }
          );
        }
      ).catch(
        error => console.log(error)
      );
  }

  signoutUser() {
    firebase.auth().signOut();
    localStorage.removeItem('user');
    this.signVal = false;
    this.signedIn.next(this.signVal);
  }

  getUserStatus() {
    return this.signVal;
  }

  setToken(token: string) {
    this.token = token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  getToken() {
    firebase.auth().currentUser.getIdToken().then(
      (token: string) => this.token = token
    );
    return this.token;
  }
}
