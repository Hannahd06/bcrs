
/**
 *  Title: update-user.component.css
 *  Author: Professor Richard Krasso
 * Modified by: Hannah Del Real
 *  Date: 02/15/24
 * Description: CSS styling for about page BCRS update user
 * Resources: Assistance for figuring out URL parameters with Snapshot: https://medium.com/@tiboprea/accessing-url-parameters-in-angular-snapshot-vs-subscription-efc4e70f9053
*/

// Import statements
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserUpdateModel } from '../user-update-model';
import { UserService } from '../user.service';
import { User } from '../user';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  // Set parameters for user object with Users interface
  user: User;

  // set empId parameter as a numerical value
  empId: number;

  // set errorMessages as type string
  errorMessage: string;

  // set successMessages as type string
  successMessage: string;

  updateUserForm: FormGroup = this.fb.group({
    firstName: [null, Validators.required], // Validate firstName
    lastName: [null, Validators.required], // Validate lastName
    role: [null, Validators.required] // Validate role
  })

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.user = {} as User

    // Use snapshot to update the Url without changing the param value
    let routeempId = this.route.snapshot.paramMap.get('empId') || '';
   // empId value
    this.empId = parseInt(routeempId, 10)
    this.errorMessage = ''
    this.successMessage = ''

    // call the getUser function in userService to get information for selected userId
    this.userService.getUser(this.empId).subscribe( {
      next: (user: any) => {
        this.user = user;
        console.log(this.user)
      },
      error: (err) => {
        console.log('error', err);
        this.errorMessage = err.message;
      },

      // preset the form's input fields with data values already stored for firstName, lastName, and role for selected empId.
      complete: () => {
        this.updateUserForm.controls['firstName'].setValue(this.user.firstName);
        this.updateUserForm.controls['lastName'].setValue(this.user.lastName);
        this.updateUserForm.controls['role'].setValue(this.user.role);
      }

    })

  }

//updateUser
  updateUser() {
    // Use the userUpdateModel interface to set parameter that will be updated
    let user = {} as UserUpdateModel;
    // get value form user input
    user.firstName = this.updateUserForm.controls['firstName'].value;
    // get value form user input
    user.lastName = this.updateUserForm.controls['lastName'].value;
    // get value form user input
    user.role = this.updateUserForm.controls['role'].value;

    this.userService.updateUser(this.empId, user).subscribe({
      next:(res) => {
        console.log(res);
        // reroute the user back to the user back to the user configuration page
        this.router.navigate(['/admin/users'])
        this.successMessage = "User has been updated successfully";
        console.log(this.successMessage);
        },
        // Error message
        error: (err) => {
          console.log('error', err);
          this.errorMessage = err.message;

        }

    })
  }
}
