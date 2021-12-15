/*
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 12 Dec 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: forgot password username
; Sources: Getting MEAN with Mongo, Express, Angular, and Node, Second Edition,
*/

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password-username',
  templateUrl: './forgot-password-username.component.html',
  styleUrls: ['./forgot-password-username.component.css']
})
export class ForgotPasswordUsernameComponent implements OnInit {
  username: String

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  findUserName(): void {

  }
}
