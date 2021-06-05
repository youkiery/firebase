import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GopyPage } from './gopy.page';

describe('GopyPage', () => {
  let component: GopyPage;
  let fixture: ComponentFixture<GopyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GopyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GopyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
