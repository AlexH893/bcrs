/*
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 12 Dec 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: Invoice-Routes
; Sources: Getting MEAN with Mongo, Express, Angular, and Node, Second Edition,
*/

import { User } from "./user.interface";

export interface SecurityQuestion {
   _id?: any;
   question: {
    _id: string;
    text: string;
   }
  answer: string;
  isDisabled: boolean;
  text?: string;
}
