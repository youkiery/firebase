import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ColPage } from './col.page';

describe('ColPage', () => {
  let component: ColPage;
  let fixture: ComponentFixture<ColPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ColPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
