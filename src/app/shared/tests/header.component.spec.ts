import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../../header/header.component';
import { AuthService } from '../services/auth.service';

// create test for header to see if Login/Logout switches based on
// value of signedInStatus



// class MockAuthService {
//   isAuthenticated = true;
//   signoutUser() {}
//   signedIn: Subject<Boolean> = new Subject<Boolean>();
// }

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let authServiceStub: Partial<AuthService>;
  let authService: AuthService;

  beforeEach(()=>{
    authServiceStub = {
      isAuthenticated: true,
      signedIn: new Subject<boolean>()
    };
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [{provide: AuthService, useValue: authServiceStub}],
      declarations: [HeaderComponent],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    // .overrideComponent(HeaderComponent, {
    //   set: {
    //     providers: [{provide: AuthService, useClass: MockAuthService}]
    //   }
    // })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    authService = TestBed.get(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ng-template rendering', () => {
    it('should create the header component', () => {
      const header = fixture.debugElement.componentInstance;
      expect(header).toBeTruthy();
    });

    it('should contain login and signup links', () => {
      component.signedInStatus = false;
      fixture.detectChanges();
      const headerElement = fixture.debugElement.nativeElement;
      const ul = headerElement.querySelector('ul');
      const li = ul.querySelectorAll('li');
      let elementsArray = [];
      li.forEach(element => {
        elementsArray.push(element.innerText);
      });
      expect(elementsArray).toContain('Login' && 'Sign Up');
    });

    it('should not contain login or sign up links', () => {
      component.signedInStatus = true;
      fixture.detectChanges();
      const headerElement = fixture.debugElement.nativeElement;
      const ul = headerElement.querySelector('ul');
      const li = ul.querySelectorAll('li');
      li.forEach(element => {
        expect(element.innerText).not.toEqual('Login' || 'Sign Up');
      });
    });

    it('should contain logout link', () => {
      component.signedInStatus = true;
      fixture.detectChanges();
      const headerElement = fixture.debugElement.nativeElement;
      const ul = headerElement.querySelector('ul');
      const li = ul.querySelectorAll('li');
      let elementsArray = [];
      li.forEach(element => {
        elementsArray.push(element.innerText);
      });
      expect(elementsArray).toContain('Logout');
    });
  });
  describe('Component property and auth testing', () => {
    // This function is just a sanity check.
    it('should register signedInStatus as true', () => {
      const status = component.signedInStatus;
      expect(status).toBe(true);
    });

    it('should set signedInStatus to false from auth', () => {
      authService.signedIn.next(false);
      fixture.detectChanges();
      const status = component.signedInStatus;
      expect(status).toBe(false);
    });
  });
});
