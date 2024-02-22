/**
 * Title: verify-email.component.ts
 * Author: Kyle Hochdoerfer
 * Date: 02/21/2024
 */

//import statements
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  //Define variables for error message, session user, and isloading
  errorMessage: string;
  isLoading: boolean = false;

  //Use form builder to create a email verification form
  verifyEmailForm: FormGroup = this.fb.group({
    email:  [null, Validators.compose([Validators.required, Validators.email ])]
  });

  //Define a constructor that passes in routing, form builder, and security service
  constructor(
    private securityService: SecurityService,
    private router: Router,
    private fb: FormBuilder
  ) {
    //Set default values for error message
    this.errorMessage = '';
  }

  //Function for verifying user email by using API via the security service
  verifyEmail(){
    //Get the email input from the form
    const email = this.verifyEmailForm.controls['email'].value;

    //Call the verify user API via the security service to see if the user is valid, and redirect
    //to the security question verification page if so
    this.securityService.verifyUser(email).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/security/verify-security-questions'], {
          queryParams: { email },
          skipLocationChange: true,
        });
        this.isLoading = false
      },
      error: (err) => {
        console.log('error', err);
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    })
  }
}
