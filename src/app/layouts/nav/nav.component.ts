/**
 * Title: nav.component.ts
 * Author: Professor Krasso
 * Date: 8/5/23
 */

// imports statements
import { CookieService } from 'ngx-cookie-service';
import { Router } from 'express';
import { Component } from '@angular/core';

export interface AppUser {
  fullName: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  appUser: AppUser
  isLoggedin: boolean

  constructor(private cookieService: CookieService) {
    this.appUser = {} as AppUser;
    this.isLoggedin = this.cookieService.get('session_user') ? true : false;

   // check if user is logged in and log user's name to console
    if (this.isLoggedin) {
      this.appUser = {
        fullName: this.cookieService.get('session_name')
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
