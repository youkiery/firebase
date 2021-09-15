import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HisPage } from './his.page';

describe('HisPage', () => {
  let component: HisPage;
  let fixture: ComponentFixture<HisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
