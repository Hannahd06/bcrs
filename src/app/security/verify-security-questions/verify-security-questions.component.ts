/**
 * Title: verify-email.component.ts
 * Author: Kyle Hochdoerfer
 * Date: 02/21/2024
 * Sources: Code was adopted an modified from Web-450 example project: https://github.com/buwebdev/web-450/tree/master/examples/week-7/mean-auth-demo
 */

//import statements
import { Component, OnInit } from '@angular/core';
import { SecurityQuestionModel } from '../security-question-model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-verify-security-questions',
  templateUrl: './verify-security-questions.component.html',
  styleUrls: ['./verify-security-questions.component.css']
})
export class VerifySecurityQuestionsComponent {
  //Create variables for security questions, email and error message
  selectedSecurityQuestions: SecurityQuestionModel[];
  email: string;
  errorMessage: string;
  isLoadingLabels: boolean;
  isLoadingSubmit: boolean;
  question1: string;
  question2: string;
  question3: string;


  //Create security question form with three fields, one for each answer
  sqForm: FormGroup = this.fb.group({
    answer1: [null, Validators.compose([Validators.required])],
    answer2: [null, Validators.compose([Validators.required])],
    answer3: [null, Validators.compose([Validators.required])]
  })

  //Declare a constructor for setting up activatedroute, Router, SecurityService, and form builder
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private securityService: SecurityService,
    private fb: FormBuilder
  ) {
    //Initialize all values for the component
    this.selectedSecurityQuestions = [];
    this.question1 = '';
    this.question2 ='';
    this.question3 = '';
    this.errorMessage = '';
    this.isLoadingLabels = true;
    this.isLoadingSubmit = false;

    //Get the email from query param
    this.email = this.route.snapshot.queryParamMap.get('email') ?? '';

    //If no email is found, navigate the user back to the forgot password page
    if (!this.email) {
      this.router.navigate(['/forgot-password'])
    }
  }

  ngOnInit(): void {
       //Call the security service to pass in the email address and set the security question data
       this.securityService.findsecurityQuestions(this.email).subscribe({
        next: (data: any) => {
          this.selectedSecurityQuestions = data.selectedSecurityQuestions;
          console.log('data:', this.selectedSecurityQuestions)
        },
        error: (err) => {
          //Set error handing for if no security questions are found, or if the email was not found
          if (err.status === 404) {
            if (this.errorMessage = 'No security Questions are associated with this email! Please contact the help desk at ITsupport@bcrs.com') {
              this.errorMessage
             } else {
              this.errorMessage = 'email address you entered was not found';
             }
            return;
          } else {
            this.errorMessage = ' there was a problem verifying your security questions'
          }
          this.isLoadingLabels = false;
        } , complete: () => {
          //If the process is successful, set the question variables to the security question text
          this.question1 = this.selectedSecurityQuestions[0].questionText;
          this.question2 = this.selectedSecurityQuestions[1].questionText;
          this.question3 = this.selectedSecurityQuestions[2].questionText;

          //Set isloading to false
          this.isLoadingLabels = false;
        }
      });
  }

  //Function for verifying security questions
  verifySecurityQuestions() {
    //Set isLoading to true
    this.isLoadingSubmit = true;

    //Create an array of security question answers and questions
    let securityQuestions = [
      {
        questionText: this.question1,
        answerText: this.sqForm.controls['answer1'].value
      },
      {
        questionText: this.question2,
        answerText: this.sqForm.controls['answer2'].value
      },{
        questionText: this.question3,
        answerText: this.sqForm.controls['answer3'].value
      }
    ];
    //Log the security questions
    console.log( securityQuestions);

    //Pass the user email and security questions to the security service by subscribing to it
    this.securityService.verifysecurityQuestions(this.email, securityQuestions).subscribe({
      next: (res) => {
        //If successful, navigate the user to the password reset page and send email as a query param
        this.router.navigate(['security/password-reset'], {
          queryParams: { email: this.email },
          skipLocationChange: true
        });
      },
      error: (err) => {
        //Error handing for if security questions cannot be verified
        if(err.error.message) {
          this.errorMessage = err.error.message;
          return
        } else {
          this.errorMessage = 'There was a problem verifying your security questions. Please try again';
          this.isLoadingSubmit = false;
        }
      },
      complete: () => {
        //Once complete, set isloading to false
        this.isLoadingSubmit = false;

      }
    })
  }

}

