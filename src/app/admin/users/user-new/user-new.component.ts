/**
    Title: user.new.componentts
    Author: Professor Richard Krasso
    Modified by: Jocelyn Dupuis
    Date: 02/17/24
    Description: create new user component
*/

//Import statements
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})

//Create and export new user component
export class UserNewComponent {
  //Set the step variable for moving between registration steps
  step: string ='credentials';

  //Declare a function to move step between form sections when called
  next(nextStep: string) {
    this.step = nextStep;
  };

  //Set error message and isLoading variables
  errorMessage: string;
  isLoading: boolean = false;

  //Create a new user form with all necessary fields
  createNewUserForm: FormGroup =  this.fb.group({
    empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])], //Validate as number
    email:  [null, Validators.compose([Validators.required, Validators.email ])], // validate email
    password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])], //Validate password to have one upper and lower case and min length of 8
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    phoneNumber: [null, Validators.compose([Validators.required,  Validators.pattern('^[0-9]*$')])], // validate numbers
    address: [null, Validators.required],
    role: [null, Validators.required],
    isDisabled: false
  })

//Declare a constructor with activated route, user service, router, and form builder as parameters
constructor (private route: ActivatedRoute, private userService: UserService, private router: Router, private fb: FormBuilder) {
  this.errorMessage = ''
}

//Declare a function for creating a new user
createNewUser() {

  // Grab from form input fields to be used to create new user
  const user: User = {
    empId: parseInt(this.createNewUserForm.controls['empId'].value, 10),
    email: this.createNewUserForm.controls['email'].value,
    password: this.createNewUserForm.controls['password'].value,
    firstName: this.createNewUserForm.controls['firstName'].value,
    lastName: this.createNewUserForm.controls['lastName'].value,
    phoneNumber: this.createNewUserForm.controls['phoneNumber'].value,
    address: this.createNewUserForm.controls['address'].value,
    role: this.createNewUserForm.controls['role'].value,
    selectedSecurityQuestions: [],
    isDisabled: false,
    lastSignin: Date.now() // Set to false for all new users to ensures that they are active once created.
  }

// Create a new user and redirect back to user config page.
  this.userService.createNewUser(user).subscribe({
    next: (res) => {
      console.log(res);
      this.router.navigate(['/admin/users']);
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
