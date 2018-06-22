import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService {
  constructor(private auth: AuthService) {  }

  // With the way I'm implementing this I don't think I actually need an auth-
 // guard service

  canActivate() {
    return this.auth.isAuthenticated();
  }
}
