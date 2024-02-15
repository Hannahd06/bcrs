/**
 * Title: auth-guard.ts
 * Author: Professor Krasso
 * modified by: Hannah Del Real
 * Date: 02/11/24
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  // Inject CookieService.
  const cookie = inject(CookieService);

  // Check that user is logged in
  if (cookie.get('session_user')) {
    console.log('User is logged in and can now access the Employee pages.')
    return true;

    // If user is not logged in reroute back to sign-in page
  } else {
    console.log('User is not logged in and cannot access the employee pages')
    const router = inject(Router);
    router.navigate(['/security/signin'], { queryParams: {returnUrl: state.url} })
    return false;
  }
};
