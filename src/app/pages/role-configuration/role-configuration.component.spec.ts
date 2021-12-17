/*
============================================
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 27 November 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: User-config Component
==========================================
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleConfigurationComponent } from './role-configuration.component';

describe('RoleConfigurationComponent', () => {
  let component: RoleConfigurationComponent;
  let fixture: ComponentFixture<RoleConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
