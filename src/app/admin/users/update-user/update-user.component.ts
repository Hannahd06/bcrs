import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  options = [
      {role: 'admin'},
      {role: 'standard'}
  ];

  form = new FormGroup({
    role: new FormControl(this.options[2])
  })
}
