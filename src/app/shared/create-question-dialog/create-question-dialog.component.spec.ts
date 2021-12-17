/*
============================================
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 27 November 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: create question dialog
==========================================
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestionDialogComponent } from './create-question-dialog.component';

describe('CreateQuestionDialogComponent', () => {
  let component: CreateQuestionDialogComponent;
  let fixture: ComponentFixture<CreateQuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateQuestionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
