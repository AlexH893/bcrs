/*
============================================
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 27 November 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: Verify security questions
==========================================
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySecurityQuestionsComponent } from './verify-security-questions.component';

describe('VerifySecurityQuestionsComponent', () => {
  let component: VerifySecurityQuestionsComponent;
  let fixture: ComponentFixture<VerifySecurityQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifySecurityQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifySecurityQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
