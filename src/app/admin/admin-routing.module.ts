/**
    Title: admin-routing.module.ts
    Author: Professor Richard Krasso
    Modified by: Hannah Del Real, Kyle Hochdoerfer, Jocelyn Dupuis
    Date: 02/14/24
    Description: Routing for the Admin features
*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { UserNewComponent } from './users/user-new/user-new.component';
import { roleGuard } from '../shared/role.guard';
import { GraphComponent } from './graph/graph.component';


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
    ],
    canActivate: [roleGuard]
  },
  {
    path: 'graph',
    component: GraphComponent,
    title: 'BCRS: Purchases by Service Graph'
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
