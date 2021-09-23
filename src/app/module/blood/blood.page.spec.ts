import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BloodPage } from './blood.page';

describe('BloodPage', () => {
  let component: BloodPage;
  let fixture: ComponentFixture<BloodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BloodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
