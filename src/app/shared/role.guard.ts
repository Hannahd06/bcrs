/**
 * Title: role-guard.ts
 * Author: Professor Krasso
 * modified by: Hannah Del Real
 * Date: 02/13/24
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { query } from 'express';
import { CookieService } from 'ngx-cookie-service';

export const roleGuard: CanActivateFn = (route, state) => {
  // Inject CookieService.
  const cookie = inject(CookieService);

// Use JSON.parse() to convert text string to a JS object
  let sessionUser = JSON.parse(cookie.get('session_user'));

  if (!sessionUser) {
    console.log('User is not logged in and cannot access this page!')
    const router = inject(Router);
    router.navigate(['/security/signin'], { queryParams: {returnUrl: state.url} });
    return false;

 // If the signed-in user does not have the admin role,
  } if (sessionUser.role !== 'admin') {
    const router = inject(Router);
    console.log("Oops! You do not have the credentials to view this page!")
    router.navigate(['/security/not-found'])
      return false
    }

    return true;
  };