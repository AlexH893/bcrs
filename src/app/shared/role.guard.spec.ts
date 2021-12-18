/*
============================================
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 27 November 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: Role guard ts
===========================================
*/
import { TestBed } from '@angular/core/testing';

import { RoleGuard } from './role.guard';

describe('RoleGuard', () => {
  let guard: RoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
