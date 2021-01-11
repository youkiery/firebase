import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BirthPage } from './birth.page';

describe('BirthPage', () => {
  let component: BirthPage;
  let fixture: ComponentFixture<BirthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BirthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
