import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  signedIn: Subject<boolean> = new Subject<boolean>();
  signVal = false;
  token: string;
  constructor(private router: Router) {
    // firebase.auth().onAuthStateChanged(function(user) {
    //
    // });
  }

  loadUser() {
    firebase.auth().onAuthStateChanged((currentUser) => {
        if (currentUser === null) {
            this.token = null;
        } else {
            currentUser.getIdToken().then(
                (token: string) => {
                  this.token = token;
                  console.log('token set');
                  this.signedIn.next(true);
                }
            );
        }
    });
  }


  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
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

  setToken(user) {
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
