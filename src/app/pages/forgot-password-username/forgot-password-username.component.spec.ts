/*
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 12 Dec 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: forgot password username
; Sources: Getting MEAN with Mongo, Express, Angular, and Node, Second Edition,
*/

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
