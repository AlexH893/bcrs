/*
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 12 Dec 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: Invoice-Routes
; Sources: Getting MEAN with Mongo, Express, Angular, and Node, Second Edition,
*/

import { SecurityQuestion } from './security-question.interface';

export interface User {

    _id?: string
    userName: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNum: string,
    address: string,
    email: string,
    role: {
      _id?: string
      text: string
    }
    securityQuestions: SecurityQuestion[],
    date_created?: Date,
    date_modified?: Date,
    isDisabled: boolean,
    _v: number
}
