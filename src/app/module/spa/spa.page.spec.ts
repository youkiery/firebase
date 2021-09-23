import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpaPage } from './spa.page';

describe('SpaPage', () => {
  let component: SpaPage;
  let fixture: ComponentFixture<SpaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
