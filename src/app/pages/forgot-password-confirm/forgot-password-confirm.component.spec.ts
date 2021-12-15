/*
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 12 Dec 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: Invoice-Routes
; Sources: Getting MEAN with Mongo, Express, Angular, and Node, Second Edition,
*/


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordConfirmComponent } from './forgot-password-confirm.component';

describe('ForgotPasswordConfirmComponent', () => {
  let component: ForgotPasswordConfirmComponent;
  let fixture: ComponentFixture<ForgotPasswordConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
