import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { UserConfigurationComponent } from './pages/user-configuration/user-configuration.component';
=======
import { SignInComponent } from './sign-in/sign-in.component';
>>>>>>> fed69fd168b2c222fa20fd110f5b77f8017efb9c

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
<<<<<<< HEAD
        path: 'user-configuration',
        component: UserConfigurationComponent
=======
        path: 'sign-in',
        component: SignInComponent
>>>>>>> fed69fd168b2c222fa20fd110f5b77f8017efb9c
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
