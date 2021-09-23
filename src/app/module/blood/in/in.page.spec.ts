import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InPage } from './in.page';

describe('InPage', () => {
  let component: InPage;
  let fixture: ComponentFixture<InPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
