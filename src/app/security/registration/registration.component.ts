/**
 * Title: registration.component.ts
 * Author: Kyle Hochdoerfer
 * Date: 02/19/2024
 */

//import statements
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '../security.service';
import { UserService } from 'src/app/admin/users/user.service';
import { User } from 'src/app/admin/users/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  step: string ='personalInfo';
  next(nextStep: string) {
    this.step = nextStep;
  };

  //Define variables for error message, session user, and isloading
  errorMessage: string;
  isLoading: boolean = false;

  securityQuestions = [
    "--Select a Question--",
    "What is your mother's maiden name?",
    "What is the name of your first pet?",
    "What is the make and model of your first car?",
    "In what city were you born?",
    "What was the name of your elementary school?"
  ]

  defaultOption = "--Select a Question--";

  //Use form builder to create a registration form
  registrationForm: FormGroup = this.fb.group({
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    email:  [null, Validators.compose([Validators.required, Validators.email ])],
    password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])],
    address: [null, Validators.compose([Validators.required])],
    phoneNumber: [null, Validators.compose([Validators.required,  Validators.pattern('^[0-9]*$')])], // validate numbers
    confirmPassword: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])],
    questionOne: [null, Validators.compose([Validators.required])],
    questionTwo: [null, Validators.compose([Validators.required])],
    questionThree: [null, Validators.compose([Validators.required])],
    answerOne: [null, Validators.compose([Validators.required])],
    answerTwo: [null, Validators.compose([Validators.required])],
    answerThree: [null, Validators.compose([Validators.required])]
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

 //function for user to signin
 register() {
  //Get the data from all user form fields
  this.isLoading = true;
  console.log("Registration Form:", this.registrationForm.value);

  const defaultQuestion = "--Select a Question--"

  //If either of the three security questions is the default, cause an error
  if(this.registrationForm.controls['questionOne'].value == defaultQuestion || this.registrationForm.controls['questionTwo'].value == defaultQuestion
   || this.registrationForm.controls['questionThree'].value == defaultQuestion){
    this.errorMessage = 'Please select three security questions';
    this.isLoading = false;
    this.hideAlert();
    return;
  }

  const selectedSecurityQuestions = [
    {
      questionText: this.registrationForm.controls['questionOne'].value,
      answerText: this.registrationForm.controls['answerOne'].value
    },
    {
      questionText: this.registrationForm.controls['questionTwo'].value,
      answerText: this.registrationForm.controls['answerTwo'].value
    },
    {
      questionText: this.registrationForm.controls['questionThree'].value,
      answerText: this.registrationForm.controls['answerThree'].value
    }
  ];

  const confirmPassword = this.registrationForm.controls['confirmPassword'].value

  const user: User = {
    empId: 1111, //Temporary ID until the API sets it
    email: this.registrationForm.controls['email'].value,
    password: this.registrationForm.controls['password'].value,
    firstName: this.registrationForm.controls['firstName'].value,
    lastName: this.registrationForm.controls['lastName'].value,
    phoneNumber: this.registrationForm.controls['phoneNumber'].value,
    address: this.registrationForm.controls['address'].value,
    selectedSecurityQuestions: selectedSecurityQuestions,
    role: "employee",
    isDisabled: false // Set to false for all new users to ensures that they are active once created.
  }

  //If the password field does not match the confirmPassword field, trigger an error
  if(user.password !== confirmPassword){
    this.errorMessage = 'Passwords do not match, please try again';
    this.isLoading = false;
    this.hideAlert();
    return;
  }

  console.log(user)

  // Create a new user and redirect back to user log-in page.
  this.securityService.registerUser(user).subscribe({
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
