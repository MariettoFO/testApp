import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionEntrenadoresPage } from './gestion-entrenadores.page';

describe('GestionEntrenadoresPage', () => {
  let component: GestionEntrenadoresPage;
  let fixture: ComponentFixture<GestionEntrenadoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionEntrenadoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionEntrenadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
