import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarReputacionComponent } from './listar-reputacion.component';

describe('ListarReputacionComponent', () => {
  let component: ListarReputacionComponent;
  let fixture: ComponentFixture<ListarReputacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarReputacionComponent]
    });
    fixture = TestBed.createComponent(ListarReputacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
