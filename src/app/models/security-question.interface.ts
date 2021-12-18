/*
============================================
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 27 November 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: Question interface
===========================================
*/

import { User } from './user.interface';

export interface SecurityQuestion {
  _id?: any;
  question: {
    _id: string;
    text: string;
  };
  answer: string;
  isDisabled: boolean;
  text?: string;
}
