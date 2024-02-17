import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTIComponent } from './register-ti.component';

describe('RegisterTIComponent', () => {
  let component: RegisterTIComponent;
  let fixture: ComponentFixture<RegisterTIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterTIComponent]
    });
    fixture = TestBed.createComponent(RegisterTIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
