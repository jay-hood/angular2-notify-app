import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BulletinBoardService } from '../services/bulletin-board.service';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../services/data-storage.service';
import { Observable, of, defer } from 'rxjs';
import { Bulletin } from '../models/bulletin.model';

let bulletins = [{
  poster: 'test poster',
  title: 'test title',
  postDate: new Date,
  content: 'test content',
  id: -1,
  userid: 'test userid'
}];
const dataServiceStub = {
  getBulletins(): Observable<Bulletin[]>{
    return defer(() => {
      Promise.resolve(bulletins);
    })
  },
  storeBulletins(bulletins){
    let myBulletins = bulletins;
  }
};

describe('Bulletin-Board Service', () => {
  let bull: BulletinBoardService;
  let auth: AuthService;
  let store: DataStorageService;

  beforeEach(() => {
    let authServiceStub = {
      currentUserId: 'test id',
      currentUserEmail: 'test email'
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        BulletinBoardService,
        {provide: AuthService, useValue: authServiceStub},
        {provide: DataStorageService, useValue: dataServiceStub}
      ]
    }).compileComponents();
  });
  beforeEach(async(inject([BulletinBoardService, AuthService, DataStorageService],
    (b, a, s) => {
      bull = b;
      auth = a;
      store = s;
    })));

  it('#setBoard should fetch board from promise',() => {
      bull.getBulletinsFromDatabase().subscribe(res => {
        bull.setBoard(res);
        expect(bull.board).toEqual(bulletins);
      });
    // "**/*.spec.ts"
  });

  it('#getMaxId should return 0 for empty bulletin arrays', () => {
    expect(bull.getMaxId()).toEqual(-1);
  });

  it('#getMaxId should return as one greater than highest id in array', () => {
    bull.getBulletinsFromDatabase().subscribe(res => {
      bull.setBoard(res);
      expect(bull.getMaxId()).toEqual(0);
    });
  });

  it('#deleteBulletin should return -1 for an index that doesn\'t exist', () => {
    expect(bull.deleteBulletin(700)).toEqual(-1);
  })

  it('#addBulletin should return an instance of type bulletin', () => {
    expect(bull.addBulletin(null, null)).toEqual(jasmine.any(Bulletin));
  });


});
