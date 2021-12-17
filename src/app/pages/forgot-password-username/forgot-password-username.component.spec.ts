import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordUsernameComponent } from './forgot-password-username.component';

describe('ForgotPasswordUsernameComponent', () => {
  let component: ForgotPasswordUsernameComponent;
  let fixture: ComponentFixture<ForgotPasswordUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordUsernameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
