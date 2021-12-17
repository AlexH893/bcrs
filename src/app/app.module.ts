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
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { VerifySecurityQuestionsComponent } from './pages/verify-security-questions/verify-security-questions.component';
import { CommonModule } from '@angular/common';
import { CreateQuestionDialogComponent } from './shared/create-question-dialog/create-question-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { InternalErrorComponent } from './pages/internal-error/internal-error.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AccountRegistrationComponent } from './pages/account-registration/account-registration.component';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatTableModule } from '@angular/material/table';
import { ForgotPasswordUsernameComponent } from './pages/forgot-password-username/forgot-password-username.component';
import { ForgotPasswordQuestionsComponent } from './pages/forgot-password-questions/forgot-password-questions.component';
import { ForgotPasswordConfirmComponent } from './pages/forgot-password-confirm/forgot-password-confirm.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { InvoiceDialogComponent } from './pages/invoice-dialog/invoice-dialog.component';
import { DatePipe } from '@angular/common';
import { RoleConfigurationComponent } from './pages/role-configuration/role-configuration.component';
import { MatMenuModule } from '@angular/material/menu';
import { RoleCreateEditComponent } from './pages/role-create-edit/role-create-edit.component';
import { PurchasesByServiceGraphComponent } from './pages/purchases-by-service-graph/purchases-by-service-graph.component';
import { ChartModule } from 'primeng/chart';


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
    AboutUsComponent,
    ContactUsComponent,
    AccountRegistrationComponent,
    ForgotPasswordUsernameComponent,
    ForgotPasswordQuestionsComponent,
    ForgotPasswordConfirmComponent,
    InvoiceDialogComponent,
    RoleConfigurationComponent,
    RoleCreateEditComponent,
    PurchasesByServiceGraphComponent,


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
    MatSelectModule,
    MatStepperModule,
    CdkStepperModule,
    MatTableModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    ChartModule

  ],
  providers: [
    CookieService,
    DatePipe,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
