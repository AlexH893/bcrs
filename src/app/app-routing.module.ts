/*
============================================
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 27 November 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: User-config Component
==========================================
*/

import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserConfigurationComponent } from './pages/user-configuration/user-configuration.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SecurityQuestionsComponent } from './pages/security-questions/security-questions.component';
import { VerifySecurityQuestionsComponent } from './pages/verify-security-questions/verify-security-questions.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user-configuration',
        component: UserConfigurationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'security-questions',
        component: SecurityQuestionsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'verify-security-questions',
        component: VerifySecurityQuestionsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'session',
    component: BaseLayoutComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      //TODO
      /*{
        path: 'not-found',
        component: NotFoundComponent,
      },*/
    ],
  },
  {
    path: '**',
    redirectTo: 'session/not-found',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
