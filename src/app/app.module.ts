/*
============================================
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 27 November 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: User-config Component
==========================================
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { UserConfigurationComponent } from './pages/user-configuration/user-configuration.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SecurityQuestionsComponent } from './pages/security-questions/security-questions.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { VerifySecurityQuestionsComponent } from './pages/verify-security-questions/verify-security-questions.component';
import { CommonModule } from '@angular/common';
import { CreateQuestionDialogComponent } from './shared/create-question-dialog/create-question-dialog.component';
import { MatInputModule } from '@angular/material/input'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { InternalErrorComponent } from './pages/internal-error/internal-error.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    SignInComponent,
    UserConfigurationComponent,
    SecurityQuestionsComponent,
    VerifySecurityQuestionsComponent,
    CreateUserComponent,
    CreateQuestionDialogComponent,
    PageNotFoundComponent,
    InternalErrorComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    RouterModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDialogModule,
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule

  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
