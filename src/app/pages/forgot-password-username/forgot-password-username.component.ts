/*
============================================
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 27 November 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: Forgot password username ts
===========================================
*/
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password-username',
  templateUrl: './forgot-password-username.component.html',
  styleUrls: ['./forgot-password-username.component.css'],
})
export class ForgotPasswordUsernameComponent implements OnInit {
  username: String;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  findUserName(): void {}
}
