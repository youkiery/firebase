import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KaiminPage } from './kaimin.page';

describe('KaiminPage', () => {
  let component: KaiminPage;
  let fixture: ComponentFixture<KaiminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KaiminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KaiminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
