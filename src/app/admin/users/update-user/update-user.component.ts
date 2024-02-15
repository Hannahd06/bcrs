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
  user: User;
  empId: number;
  errorMessage: string;
  successMessage: string;

  updateUserForm: FormGroup = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    role: [null, Validators.required]
  })

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.user = {} as User
    let routeempId = this.route.snapshot.paramMap.get('empId') || '';
    this.empId = parseInt(routeempId, 10)
    this.errorMessage = ''
    this.successMessage = ''


  }

  updateUser() {
    let user = {} as UserUpdateModel;
    user.firstName = this.updateUserForm.controls['firstName'].value;
    user.lastName = this.updateUserForm.controls['lastName'].value;
    user.role = this.updateUserForm.controls['role'].value;

    this.userService.updateUser(this.empId, user).subscribe({
      next:(res) => {
        console.log(res);
        this.router.navigate(['/admin/users'])
        this.successMessage = "User has been updated successfully";
        console.log(this.successMessage);
        },
        error: (err) => {
          console.log('error', err);
          this.errorMessage = err.message;

        }

    })
  }
}
