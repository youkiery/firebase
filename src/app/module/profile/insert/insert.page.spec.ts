import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsertProfile } from './insert.page';

describe('InsertProfile', () => {
  let component: InsertProfile;
  let fixture: ComponentFixture<InsertProfile>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertProfile ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsertProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
