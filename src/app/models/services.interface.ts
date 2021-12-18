/*
============================================
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 27 November 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: Services interface
===========================================
*/

export interface IService {
  name: string;
  value: number;
  description?: string;
  selected?: boolean;
  image?: string;
}
