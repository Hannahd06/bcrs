/**
 * Title: nav.component.ts
 * Author: Professor Krasso
 * Modified by: Team Hufflepuff Hannah Del Real, Jocelyn Dupuis, Kyle Hochdoefer
 * Date: 02/11/24
 */

// imports statements
import { CookieService } from 'ngx-cookie-service';
import { Router } from 'express';
import { Component } from '@angular/core';

export interface AppUser {
  fullName: string;
  role: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  appUser: AppUser
  isSignedIn: boolean

  constructor(private cookieService: CookieService) {
    this.appUser = {} as AppUser;
    this.isSignedIn = this.cookieService.get('session_user') ? true : false;

   // check if user is logged in and log user's name to console
    if (this.isSignedIn) {
      this.appUser = {
        fullName: this.cookieService.get('session_name'),
        role: this.cookieService.get('session_role')
      }
      console.log(this.appUser.fullName)
    }
  }

  // function to sign out user and clear cookies
  signout() {
    console.log('Signing out...');
    this.cookieService.deleteAll();
    window.location.href = '/';
  }

}
