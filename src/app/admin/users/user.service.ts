/**
    Title: user.service.ts
    Author: Professor Richard Krasso
    Modified by: Hannah Del Real, Kyle Hochdoerfer
    Date: 02/14/24
    Description: Task service
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserUpdateModel } from './user-update-model';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient ) { }

   /**
  * @description update function to update a information for an empId
  * @param empId
  * @returns status code 204 (no content)
  */
 updateUser(empId: number, user: UserUpdateModel) {
  console.log('api/users/' + empId + '/update');
  // update selected user's information based on empId
  return this.http.put('api/users/' + empId, { user })
 }

 //Function that returns the URL API for getting all users from the database
 getUsers(){
  return this.http.get('/api/users');
}

// Function that returns User by empId
getUser(empId: number) {
  return this.http.get('/api/users/' + empId)

}

}
