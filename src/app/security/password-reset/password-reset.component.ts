import { FormControl } from '@angular/forms';
/**
 * Author: Kyle Hochdoerfer
 * Date: 2/22/2024
 * File Name: password-reset.component.ts
 * Description: Reset password component
 */

// import statements
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from '../security.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  errorMessage: string // error message variable
  email: string // email address variable
  isLoading: boolean = false // loading variable

  //Create a change password form with a password and a confirm password field
  passwordResetForm: FormGroup = this.fb.group({
    password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])],
    confirmPassword: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])]
  })

  //Declare a constructor while passing in form builder, security service, activated route, and router
  constructor (private fb: FormBuilder, private securityService: SecurityService, private route: ActivatedRoute, private router: Router) {
    //Get the email address from the query
    this.email = this.route.snapshot.queryParamMap.get('email') ?? ''
    this.errorMessage = '' // initialize the errorMessage variable

    // if no email address is found, redirect to the forgot password page
    if (!this.email) {
      console.log('No email address found')
      this.router.navigate(['/'])
    }
  }

  passwordReset(){
    //Get the password and confirm password values from the form
    const password = this.passwordResetForm.controls['password'].value
    const confirmPassword = this.passwordResetForm.controls['confirmPassword'].value

    console.log(password + "   " + confirmPassword)

    //If the passwords do not match, call return and change the value of error message
    if(password !== confirmPassword){
      this.errorMessage = 'Passwords do not match, please try again';
      this.isLoading = false;
      this.hideAlert();
      return;
    }

    const passwordObject: Object = {
      password: password
    }

    //Make an http request to the password reset API, passing in the user email and new password
    this.securityService.resetPassword(this.email, passwordObject).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/security/signin']);
        this.isLoading = false
      },
      error: (err) => {
        console.log('error', err);
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    })
  }

   // Set a timeout for alert displays
  hideAlert() {
    setTimeout( () => {
    this.errorMessage = '';
  }, 5000)
}

}
