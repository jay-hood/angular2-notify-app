import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { AuthService } from '../services/auth.service';

describe('Auth-Guard Service', () => {
  let mockSnapshot: RouterStateSnapshot;
  let ags: AuthGuardService;
  let aus: AuthService;
  let rtr: Router;

  beforeEach(async(() => {
    let authServiceStub = {
      isAuthenticated: false
    };
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuardService, {provide: AuthService, useValue: authServiceStub}]
    });
    mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
  }));

  beforeEach(async(inject([AuthGuardService, AuthService, Router],
    (guard, auth, router) => {
      ags = guard;
      aus = auth;
      rtr = router;
    })));

  it('#canActivate should return false', () => {
    expect(ags.canActivate(null, mockSnapshot)).toBe(false);
  });

  it('#canActivateChild should return false', () => {
    expect(ags.canActivateChild(null, mockSnapshot)).toBe(false);
  });



});
