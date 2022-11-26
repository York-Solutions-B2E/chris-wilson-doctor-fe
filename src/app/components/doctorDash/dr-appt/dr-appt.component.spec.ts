import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrApptComponent } from './dr-appt.component';

describe('DrApptComponent', () => {
  let component: DrApptComponent;
  let fixture: ComponentFixture<DrApptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrApptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrApptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
