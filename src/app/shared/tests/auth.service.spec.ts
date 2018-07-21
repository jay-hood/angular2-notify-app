import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from 'angularfire2';
import { of } from 'rxjs';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Router } from '@angular/router';
// import { AuthGuardService } from '../services/auth-guard.service';
import { AuthService } from '../services/auth.service';
import { dataServiceStub, mockActivatedRoute, notes, mockFireAuth, authState } from './stubs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '../../../environments/environment';

describe('Auth Service', () => {
  // let ags: AuthGuardService;
  let aus: AuthService;
  let rtr: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        // AngularFireModule.initializeApp(environment.firebase),
        // AngularFireDatabaseModule,
        // AngularFireAuthModule
      ],
      providers: [{provide: AuthService, useValue: mockFireAuth}],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    aus = TestBed.get(AuthService);

    // This doesn't work because you can't spy on non get properties
    // spyOn(mockFireAuth, 'authState');
  });

  it('should return user auth data', () => {
    aus.authState.subscribe(res => {
      expect(res).toBe(authState);
    });
  });

  it('#signInWithEmailAndPassword should pass auth information', () => {
    aus.afAuth.auth.signInWithEmailAndPassword('some@thing.com', 'password')
      .then(res => expect(res).toBe('authstate set'));
  });

  it('#signInWithEmailAndPassword should have been called', () => {
    expect(aus.afAuth.auth.signInWithEmailAndPassword).toHaveBeenCalled();
  });

  it('#isAuthenticated should return false for authenticated', () => {
    expect(aus.isAuthenticated).toBe(false);
  });

  it('#loadUser should change authState', () => {
    // spyOn(aus, 'loadUser');
    mockFireAuth.loadUser();
    expect(authState.email).toBe('loaded email');
  });

});
