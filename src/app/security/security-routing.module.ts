/**
 * Title: security-routing.module.ts
 * Author: Professor Krasso
 * Date: 8/5/23
 */

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';
import { SigninComponent } from './signin/signin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegistrationComponent } from './registration/registration.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { VerifySecurityQuestionsComponent } from './verify-security-questions/verify-security-questions.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent,
        title: 'BCRS: Sign In'
      },
      {
        path: 'not-found',
        component: NotFoundComponent,
        title: '404 Error'
      },
      {
        path: 'registration',
        component: RegistrationComponent,
        title: 'register'
      },
      {
        path: 'verify-email',
        component: VerifyEmailComponent
      },
      {
        path: 'verify-security-questions',
        component: VerifySecurityQuestionsComponent
      },
      {
        path: 'password-reset',
        component: PasswordResetComponent
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
