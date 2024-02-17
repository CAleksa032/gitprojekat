import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTIIComponent } from './register-tii.component';

describe('RegisterTIIComponent', () => {
  let component: RegisterTIIComponent;
  let fixture: ComponentFixture<RegisterTIIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterTIIComponent]
    });
    fixture = TestBed.createComponent(RegisterTIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
