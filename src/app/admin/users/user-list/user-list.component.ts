//--------------------------------------------
//Title: user-list.component.js
//Author: Kyle Hochdoerfer
//Date: 02/14/24
//Description: User list component for BCRS
//---------------------------------------------

//Import statements
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

//Create and export a user list component
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  //Create a variable for holding user data
  userData: User[];
  errorMessage: string;

  //Declare a constructor with the userService as a parameter
  constructor(private userService :UserService){
    this.userData = []
    this.errorMessage = ''

    //Subscribe to to the database to store user document data in the data variable
    this.userService.getUsers().subscribe({
      next: (userData: any ) => {
        console.log ('List of users:', this.userData);
        this.userData = userData;
      },
      error: (err) => {
        this.errorMessage = err.message
      },
      complete: () => {
      }
    })
 }

 //Create a method to delete a user
 deleteUser(empId: number) {
  //Check if the id is defined
  if (empId !== undefined) {

    //Confirm the admin wants to disable the user
    if (!confirm('Are you sure you want to disable user with empID' + empId + '?')) {
      return;
    }

    //Log the user's ID to the console
    console.log('Disabling user:', empId);

    //Call the user service to delete the user
    this.userService.deleteUser(empId).subscribe({
      next: (result) => {
        this.userData = this.userData.filter(user => user.empId !== empId)
        console.log('result:', result); // log the result to the console
      },
      error: (err) => {
        console.error('error:', err); // log any errors to the console
      }
      });
    } else {
      console.error('User ID is undefined'); // log an error to the console
    }
  }
}
