import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserConfigurationComponent } from './pages/user-configuration/user-configuration.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SecurityQuestionsComponent } from './pages/security-questions/security-questions.component';
import { CreateUserComponent } from './pages/create-user/create-user.component'

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'user-configuration',
        component: UserConfigurationComponent
      },
      {
        path: 'sign-in',
        component: SignInComponent
      },
      {
        path: 'security-questions',
        component: SecurityQuestionsComponent
      },
      {
        path: 'create-user',
        component: CreateUserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
