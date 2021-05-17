import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminDetail } from './detail.page';

describe('AdminDetail', () => {
  let component: AdminDetail;
  let fixture: ComponentFixture<AdminDetail>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDetail ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
