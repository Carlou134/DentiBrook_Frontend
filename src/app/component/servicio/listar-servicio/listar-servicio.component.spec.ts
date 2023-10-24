import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarServicioComponent } from './listar-servicio.component';

describe('ListarServicioComponent', () => {
  let component: ListarServicioComponent;
  let fixture: ComponentFixture<ListarServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarServicioComponent]
    });
    fixture = TestBed.createComponent(ListarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
