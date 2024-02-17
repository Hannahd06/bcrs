/**
 * Title: signin.component.ts
 * Author: Jocelyn Dupuis
 * Date: 02/13/2024
 */

//import statements
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { UserService } from 'src/app/admin/users/user.service';
import { User } from 'src/app/admin/users/user';

//exports session user interface
export interface SessionUser {
  empId: number;
  email: string;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

//exports class
export class SigninComponent {
  user: User; // User object
  errorMessage: string; // Error message

  // Inject the user service and router
  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) {
    this.user = {} as User; // Initialize the user object
    this.errorMessage = ''; // Initialize the error message
  }

  // Signin method
  signin() {
    this.userService.login(this.user).subscribe({
      next: () => {
        // Add the user to a cookie using the ngx-cookie-service
        this.cookieService.set('session_user', this.user.email, 1); // Expires in 1 day

        // If the login is successful, redirect to the home page
        this.router.navigate(['/']);
      },
      error: () => {
        // If the login fails, log the error
        console.error();
        this.errorMessage = 'The email or password is incorrect';
      }
    });
  }
}
