import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAvailViewComponent } from './doctor-avail-view.component';

describe('DoctorAvailViewComponent', () => {
  let component: DoctorAvailViewComponent;
  let fixture: ComponentFixture<DoctorAvailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorAvailViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAvailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
