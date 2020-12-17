import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EquipoPage } from './equipo.page';

describe('EquipoPage', () => {
  let component: EquipoPage;
  let fixture: ComponentFixture<EquipoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EquipoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
