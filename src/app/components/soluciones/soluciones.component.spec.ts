import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolucionesComponent } from './soluciones.component';

describe('SolucionesComponent', () => {
  let component: SolucionesComponent;
  let fixture: ComponentFixture<SolucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolucionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
