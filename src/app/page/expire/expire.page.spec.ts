import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpirePage } from './expire.page';

describe('ExpirePage', () => {
  let component: ExpirePage;
  let fixture: ComponentFixture<ExpirePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpirePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
