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
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { InternalErrorComponent } from './pages/internal-error/internal-error.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AccountRegistrationComponent } from './pages/account-registration/account-registration.component';
import { ForgotPasswordUsernameComponent } from './pages/forgot-password-username/forgot-password-username.component';
import { ForgotPasswordQuestionsComponent } from './pages/forgot-password-questions/forgot-password-questions.component';
import { ForgotPasswordConfirmComponent } from './pages/forgot-password-confirm/forgot-password-confirm.component';
import { RoleConfigurationComponent } from './pages/role-configuration/role-configuration.component';
import { RoleGuard } from './shared/role.guard';
import { PurchasesByServiceGraphComponent } from './pages/purchases-by-service-graph/purchases-by-service-graph.component';
/*import { PurchasesByServiceGraphComponent } from './pages/purchases-by-service-graph/purchases-by-service-graph.component';*/

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
        path: 'about-us',
        component: AboutUsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user-configuration',
        component: UserConfigurationComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'security-questions',
        component: SecurityQuestionsComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'verify-security-questions',
        component: VerifySecurityQuestionsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'account-registration',
        component: AccountRegistrationComponent
      },
      {
        path: 'role-configuration',
        component: RoleConfigurationComponent,
        canActivate: [AuthGuard, RoleGuard]
      },
      {
          path: 'purchases-by-service-graph',
          component: PurchasesByServiceGraphComponent,
          canActivate: [AuthGuard]
      }
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
      {
        path: 'forgot-password',
        children: [
          {
            path: '',
            component: ForgotPasswordUsernameComponent
          },
          {
            path: 'confirm',
            component: ForgotPasswordConfirmComponent
          },
          {
            path: ':username',
            component: ForgotPasswordQuestionsComponent
          }

        ]

      },

      {
        path: 'internal-error',
        component: InternalErrorComponent
      },
      {
        path: 'not-found',
        component: PageNotFoundComponent
      },
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
