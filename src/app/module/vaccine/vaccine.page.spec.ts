import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VaccinePage } from './vaccine.page';

describe('VaccinePage', () => {
  let component: VaccinePage;
  let fixture: ComponentFixture<VaccinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VaccinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
