import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataStorageService } from './data-storage.service';
import { NoteService } from './note.service';

@Injectable()
export class AuthService {
  signedIn: Subject<boolean> = new Subject<boolean>();
  signVal = false;
  token: string;
  redirectURL: string;
  userId: string;
  currentUserEmail: string;

  constructor(
    private router: Router,
    private ns: NoteService
  ) {}

  loadUser() {
    firebase.auth().onAuthStateChanged((currentUser) => {
        if (currentUser === null) {
            this.token = null;
        } else {
            this.userId = currentUser.uid;
            this.currentUserEmail = currentUser.email;
            currentUser.getIdToken().then(
                (token: string) => {
                  this.token = token;
                  this.signedIn.next(true);
                  if (this.redirectURL) {
                    this.router.navigate([this.redirectURL]);
                  }
                }
            );
        }
    });
  }


  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['']);
          firebase.auth().currentUser.getIdToken().then(
            (token: string) => {
              this.userId = firebase.auth().currentUser.uid;
              this.currentUserEmail = firebase.auth().currentUser.email;
              this.token = token;
              this.signVal = true;
              this.signedIn.next(this.signVal);
            }
          );
        }
      ).catch(
        error => console.log(error)
      );
  }
  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['']);
        }
      ).catch(
        error => console.log(error)
      );
  }

  signoutUser() {
    firebase.auth().signOut();
    this.signVal = false;
    this.signedIn.next(this.signVal);
    this.ns.clearNotes();
    this.router.navigate(['']);
  }

  getUserStatus() {
    return this.signVal;
  }


  isAuthenticated(): boolean {
    return this.token != null;
  }

  getToken() {
    firebase.auth().currentUser.getIdToken().then(
      (token: string) => this.token = token
    );
    return this.token;
  }
}
