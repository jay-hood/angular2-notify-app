import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    private auth: AuthService,
    private router: Router) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isAuthenticated()) {
      return true;
      // if user navigates to new location, returns true
    }
    // if just initialized, or on refresh, returns false. Have to use angularfire.
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    // this.router.navigate(['./signin']);
    console.log('ca: false');
    return false;
  }
}
