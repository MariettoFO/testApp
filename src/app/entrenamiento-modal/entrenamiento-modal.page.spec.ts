import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntrenamientoModalPage } from './entrenamiento-modal.page';

describe('EntrenamientoModalPage', () => {
  let component: EntrenamientoModalPage;
  let fixture: ComponentFixture<EntrenamientoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrenamientoModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntrenamientoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
