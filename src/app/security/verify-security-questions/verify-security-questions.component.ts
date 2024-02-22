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
import { UserService } from 'src/app/admin/users/user.service';

@Component({
  selector: 'app-verify-security-questions',
  templateUrl: './verify-security-questions.component.html',
  styleUrls: ['./verify-security-questions.component.css']
})
export class VerifySecurityQuestionsComponent {
  //Define variables for error message, session user, and isloading
  errorMessage: string;
  isLoading: boolean = false;

  //Use form builder to create a email verification form
  verifyQuestionsForm: FormGroup = this.fb.group({
    answerOne: [null, Validators.compose([Validators.required])],
    answerTwo: [null, Validators.compose([Validators.required])],
    answerThree: [null, Validators.compose([Validators.required])]
  });



  //Define a constructor that passes in routing, form builder, and security service
  constructor(
    private securityService: SecurityService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    //Set default values for error message
    this.errorMessage = '';
  }

  verifyQuestions(){
    const userAnswers = this.userService.findSelectedSecurityQuestions
    const inputAnswers = []
  }
}
