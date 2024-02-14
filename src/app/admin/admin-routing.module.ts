import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { UserNewComponent } from './users/user-new/user-new.component';
import { roleGuard } from '../shared/role.guard';


const routes: Routes = [
  {
    path: 'users',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: UserListComponent,
        title: 'BCRS: Users list'
      },
      {
        path: ':empId/update',
        component: UpdateUserComponent,
        title: 'BCRS: Update a user'
      },
      {
        path: 'new',
        component: UserNewComponent,
        title: 'BCRS: Create a New User'
      }
    ]
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
