import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UndonePage } from './undone.page';

describe('UndonePage', () => {
  let component: UndonePage;
  let fixture: ComponentFixture<UndonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UndonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
