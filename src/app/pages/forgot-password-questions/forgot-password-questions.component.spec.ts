/*
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 12 Dec 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: forgot password questions
; Sources: Getting MEAN with Mongo, Express, Angular, and Node, Second Edition,
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordQuestionsComponent } from './forgot-password-questions.component';

describe('ForgotPasswordQuestionsComponent', () => {
  let component: ForgotPasswordQuestionsComponent;
  let fixture: ComponentFixture<ForgotPasswordQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
