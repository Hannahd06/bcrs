/**
 * Title: app-routing.module.ts
 * Author: Professor Krasso
 * modified by: Hannah Del Real, Jocelyn Dupuis, Kyle Hochdoefer
 * Date: 8/5/23
 */

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { authGuard } from './shared/auth.guard';
import { UserListComponent } from './admin/users/user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegistrationComponent } from './security/registration/registration.component';
import { DirectoryComponent } from './directory/directory.component';
import { FaqComponent } from './faq/faq.component';
import { VerifyEmailComponent } from './security/verify-email/verify-email.component';
import { VerifySecurityQuestionsComponent } from './security/verify-security-questions/verify-security-questions.component';

// routes array with a path, component, and title for each route in the application (e.g. home, about, contact, etc.)
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'BCRS: Home' // title for the home page
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'BCRS: Home'
      },
      {
        path: 'about',
        component: AboutComponent,
        title: 'BCRS: About Us'
      },
      {
        path: 'contact',
        component: ContactComponent,
        title: 'BCRS: Contact Us'
      },
      {
        path: 'directory',
        component: DirectoryComponent,
        title: 'BCRS: Directory'
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        title: 'BCRS: User Profile',
        canActivate: [authGuard]
      },
      {
        path: 'faq',
        component: FaqComponent,
        title: 'BCRS: FAQs'
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [authGuard]
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: "verify-email",
        component: VerifyEmailComponent
      },
      {
        path: "verify-security-questions",
        component: VerifySecurityQuestionsComponent
      }
    ]
  },
  {
    // path for the security module (e.g. login, register, forgot password, etc.)
    path: 'security',
    loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
  },
  {
    path: '**',
    redirectTo: 'security/not-found'
  }
];

@NgModule({
  // imports the RouterModule and defines the routes array and other options (e.g. useHash, enableTracing, scrollPositionRestoration)
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
