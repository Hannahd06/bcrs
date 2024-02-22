
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
import { SecurityQuestionModel } from './security-question-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { }
  getUserByEmpId(empId: number) {
    // return user document for corresponding empId
    return this.http.get('/api/users/' + empId);
  }

  // Pathway for signIn
 signIn(email: string, password: string) {
  return this.http.post('/api/security/signIn', { email, password })
 }

  //Registration function that returns an http post request with a new user object
  registerUser(user: User){
    return this.http.post('/api/security/register', {user})
  }

  //Email verification function that returns an http get request
  verifyUser(email: string){
    return this.http.post('/api/security/verify/users/' + email, {email})
  }


     //Email verification function that returns an http get request
  findsecurityQuestions(email: string){
    return this.http.post(`/api/users/${email}/security-questions`, {})
  }


  //Email verification function that returns an http get request
  verifysecurityQuestions(email: string, securityQuestions: SecurityQuestionModel[]){
    return this.http.post(`/api/security/verify/users/${email}/security-questions`, {securityQuestions})
  }

}


