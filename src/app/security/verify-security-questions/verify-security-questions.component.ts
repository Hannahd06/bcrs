/**
 * Title: verify-email.component.ts
 * Author: Kyle Hochdoerfer
 * Date: 02/21/2024
 */

//import statements
import { Component } from '@angular/core';
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
  selectedSecurityQuestions: SecurityQuestionModel[];
  email: string;
  errorMessage: string;
  isLoadingLabels: boolean;
  isLoadingSubmit: boolean;
  question1: string;
  question2: string;
  question3: string;


  sqForm: FormGroup = this.fb.group({
    answer1: [null, Validators.compose([Validators.required])],
    answer2: [null, Validators.compose([Validators.required])],
    answer3: [null, Validators.compose([Validators.required])]
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private securityService: SecurityService,
    private fb: FormBuilder
  ) {
    this.selectedSecurityQuestions = [];
    this.question1 = '';
    this.question2 ='';
    this.question3 = '';
    this.errorMessage = '';
    this.isLoadingLabels = true;
    this.isLoadingSubmit = false;
    this.email = this.route.snapshot.queryParamMap.get('email') ?? '';

    if (!this.email) {
      this.router.navigate(['/forgot-password'])
    }
    this.securityService.findsecurityQuestions(this.email).subscribe({
      next: (data: any) => {
        this.selectedSecurityQuestions = data.selectedSecurityQuestions;
        console.log('data:', this.selectedSecurityQuestions)
      },
      error: (err) => {
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
        this.question1 = this.selectedSecurityQuestions[0].questionText;
        this.question2 = this.selectedSecurityQuestions[1].questionText;
        this.question3 = this.selectedSecurityQuestions[2].questionText;

        this.isLoadingLabels = false;
      }
    });
  }
  verifySecurityQuestions() {
    this.isLoadingSubmit = true;
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
    console.log( securityQuestions);
    this.securityService.verifysecurityQuestions(this.email, securityQuestions).subscribe({
      next: (res) => {
        this.router.navigate(['security/password-reset'], {
          queryParams: { email: this.email },
          skipLocationChange: true
        });
      },
      error: (err) => {
        if(err.error.message) {
          this.errorMessage = err.error.message;
          return
        } else {
          this.errorMessage = 'There was a problem verifying your security questions. Please try again';
          this.isLoadingSubmit = false;
        }
      },
      complete: () => {
        this.isLoadingSubmit =false;

      }
    })
  }

}

