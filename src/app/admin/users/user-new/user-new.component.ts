/**
 *  Title: user-new.component.css
 *  Author: Professor Richard Krasso
 * Modified by: Jocelyn Dupuis
 *  Date: 02/17/24
 * Description: Ts file for new user component
*/

//import statements
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})

//exports UserNewComponent
export class UserNewComponent implements OnInit{
  createNewUserForm: FormGroup;
  message: string = '';
  

  //constructor that injects the HttpClient
  constructor(private http: HttpClient) {
    //creates new FormGroup
    this.createNewUserForm = new FormGroup({
      'userName': new FormControl(null, Validators.required), //validators required
      'password': new FormControl(null, Validators.required), //validators required
      'email': new FormControl(null, [Validators.required, Validators.email]), //validators required
      'firstName': new FormControl(null), //validators required
      'lastName': new FormControl(null), //validators required
      'phoneNumber': new FormControl(null), //validators required
      'address': new FormControl(null) //validators required
    });

  }
  ngOnInit() {}

  //createNewUser object to send to server
  createNewUser(user: any) {
    if (this.createNewUserForm.valid) {
      this.http.post('http://localhost:3000/api/users', user)
        .subscribe(response => {
          console.log(response);
          //displays message if successful
          this.message = 'New user created successfully';
          //resets form after submission
          this.createNewUserForm.reset();
        }, error => {
          //displays message if error when creating user
          console.error(error);
          this.message = 'An error occurred while creating the user';
        });
    } else {
      //returns error is form wasn't completely filled out
      this.message = 'Please fill out the entire form before submitting';
    }
  }
}
