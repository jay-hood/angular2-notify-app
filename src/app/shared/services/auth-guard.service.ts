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
    }
    this.router.navigate(['./signin']);
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['./signin']);
    return false;
  }
}
