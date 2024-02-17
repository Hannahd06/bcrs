import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}


