/*
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 12 Dec 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: Internal Error
; Sources: Getting MEAN with Mongo, Express, Angular, and Node, Second Edition,
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalErrorComponent } from './internal-error.component';

describe('InternalErrorComponent', () => {
  let component: InternalErrorComponent;
  let fixture: ComponentFixture<InternalErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
