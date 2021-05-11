import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrugPage } from './drug.page';

describe('DrugPage', () => {
  let component: DrugPage;
  let fixture: ComponentFixture<DrugPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrugPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
