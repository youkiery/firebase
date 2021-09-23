import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FiveminPage } from './fivemin.page';

describe('FiveminPage', () => {
  let component: FiveminPage;
  let fixture: ComponentFixture<FiveminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FiveminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
