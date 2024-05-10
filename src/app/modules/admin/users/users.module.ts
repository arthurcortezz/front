import { NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { usersRoutes } from './users.routing';
import { SharedModule } from '../../../shared/shared.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersFormComponent } from './components/users-form/users-form.component';

@NgModule({
  declarations: [UsersListComponent, UsersFormComponent],
  imports: [NgIf, SharedModule, RouterModule.forChild(usersRoutes)],
})
export class UsersModule {}
