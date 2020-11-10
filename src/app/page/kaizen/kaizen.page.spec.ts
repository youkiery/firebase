import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KaizenPage } from './kaizen.page';

describe('KaizenPage', () => {
  let component: KaizenPage;
  let fixture: ComponentFixture<KaizenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KaizenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KaizenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
