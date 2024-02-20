
/**
 * Title: security.service.ts
 * Author: Professor Richard Krasso
 * Modified by: Jocelyn Dupuis
 *  Date: 02/17/24
 * Description: security service for sign in for  BcRS
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../admin/users/user';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { }
  getUserByEmpId(empId: number) {
    // return user document for corresponding empId
    return this.http.get('/api/users/' + empId);
  }

  // Pathway for sigIn
 signIn(email: string, password: string) {
  return this.http.post('/api/security/signIn', { email, password })
 }

  //Registration function that returns an http post request with a new user object
  registerUser(user: User){
    console.log("BIG TEST")
    return this.http.post('api/security/register', {user})
  }
}


