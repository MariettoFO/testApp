import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlantillaModalPage } from './plantilla-modal.page';

describe('PlantillaModalPage', () => {
  let component: PlantillaModalPage;
  let fixture: ComponentFixture<PlantillaModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlantillaModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
