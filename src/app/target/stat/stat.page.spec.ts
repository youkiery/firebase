import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatPage } from './stat.page';

describe('StatPage', () => {
  let component: StatPage;
  let fixture: ComponentFixture<StatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
