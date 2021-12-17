/*
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 12 Dec 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: Invoice-Routes
; Sources: Getting MEAN with Mongo, Express, Angular, and Node, Second Edition,
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRegistrationComponent } from './account-registration.component';

describe('AccountRegistrationComponent', () => {
  let component: AccountRegistrationComponent;
  let fixture: ComponentFixture<AccountRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
