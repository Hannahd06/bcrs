//--------------------------------------------
//Title: user-list.component.js
//Author: Kyle Hochdoerfer
//Date: 02/14/24
//Description: User list component for BCRS
//---------------------------------------------

//Import statements
import { Component } from '@angular/core';
import { UserService } from '../user.service';

//Create and export a user list component
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  //Create a variable for holding user data
  userData: any;

  //Declare a constructor with the userService as a parameter
  constructor(private user:UserService){

    //Subscribe to to the database to store user document data in the data variable
    this.user.getUsers().subscribe(data=>{
      this.userData=data;
    })
 }
}
