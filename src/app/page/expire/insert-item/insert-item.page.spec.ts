import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsertItemPage } from './insert-item.page';

describe('InsertItemPage', () => {
  let component: InsertItemPage;
  let fixture: ComponentFixture<InsertItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsertItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
