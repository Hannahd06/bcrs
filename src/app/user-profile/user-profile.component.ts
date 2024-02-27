/**
 * Title: user-profile.component.ts
 * Author: Professor Richard Krasso
 * Modified by: Team Hufflepuff
 *  Date: 02/17/24
 * Description: User profile component for BCRS
*/

//Import component from angular
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../admin/users/user';
import { UserService } from '../admin/users/user.service';
import { UserUpdateModel } from '../admin/users/user-update-model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

//Create and export the user profile component
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  //Create isSigned in variable for cookie service
  isSignedIn: boolean

  //Create a variable for the user's status
  userStatus: string

  // set errorMessages as type string
  errorMessage: string;

  // set successMessages as type string
  successMessage: string;

  //Create a variable to hold the data of the user that is signed in
  user: User;

  //Set a variable to toggle profile editing
  isEditing: Boolean

  //Create a form for editing user address and phone number
  profileForm: FormGroup = this.fb.group({
    address: [null, Validators.compose([Validators.required])],
    phoneNumber: [null, Validators.compose([Validators.required])]
  })

  //Declare a constructor that passed in cookie service, checks is the user is signed in, and sets appuser
  constructor(private cookieService: CookieService, private fb: FormBuilder, private userService: UserService) {
    //Set appUser and isSigned in for cookie service
    this.isSignedIn = this.cookieService.get('session_user') ? true : false;

    //Initialize the user object
    this.user = {} as User

    //Initialize user status
    this.userStatus = ""

    //Initialize success and error messages
    this.errorMessage = ''
    this.successMessage = ''

    //Get the current session user's JSON data
    const userJSON = this.cookieService.get('session_user');

    //Parse the user JSON to get the a user object
    const userData = JSON.parse(userJSON)

    //Call get user to get the user's information using the ID
    this.userService.getUser(userData.empId).subscribe( {
      next: (user: any) => {
        //Set user to hold the user's data
        this.user = user;
        console.log(this.user)
      },
      error: (err) => {
        console.log('error', err);
        this.errorMessage = err.message;
      },

      complete: () => {
        //Set the value of userStatus depending on if the user is currently disabled or not
        if(this.user.isDisabled){
          this.userStatus = "Disabled"
        } else {
          this.userStatus = "Active"
        }
      }
    })

    //Initialize isEditing to false
    this.isEditing = false
  }

  //Create a function that toggles the boolean value of isEditing
  editForm(){
    if(this.isEditing){
      this.isEditing = false
    } else {
      this.isEditing = true;
    }
  }

  //Create a function that edits the user's email and address
  editProfile(){
    // Use the userUpdateModel interface to set parameter that will be updated
    let user = {} as UserUpdateModel;

    //Set the user email, first name, last name, and role to their pre-existing value
    user.email = this.user.email
    user.firstName = this.user.firstName
    user.lastName = this.user.lastName
    user.role = this.user.role

    //Set the user's address and phone number to the values from the profile form
    user.address = this.profileForm.controls['address'].value;
    user.phoneNumber = this.profileForm.controls['phoneNumber'].value;

    //Update the user, set isEditing to false, and handle the error and success messages
    this.userService.updateUser(this.user.empId, user).subscribe({
      next:(res) => {
        console.log(res);
        this.successMessage = "User has been updated successfully";
        this.isEditing = false
        console.log(this.successMessage);
        this.hideAlert();
        },
        // Error message
        error: (err) => {
          console.log('error', err);
          this.errorMessage = err.message;
          if (err = new Error('Unable to update user record for empId' + this.user.empId) ) {
            this.errorMessage = 'User information was not changed!';
          }
          this.hideAlert();
        }
    })
  }

  // Set a timeout for alert displays
  hideAlert() {
    setTimeout( () => {
      this.errorMessage = '';
      this.successMessage= '';
    }, 5000)
  }
}
