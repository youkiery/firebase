import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsgPage } from './usg.page';

describe('UsgPage', () => {
  let component: UsgPage;
  let fixture: ComponentFixture<UsgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsgPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
