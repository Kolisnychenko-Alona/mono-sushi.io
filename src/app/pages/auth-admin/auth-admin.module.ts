import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AuthAdminRoutingModule } from './auth-admin-routing.module';
import { AuthAdminComponent } from './auth-admin.component';


@NgModule({
  declarations: [AuthAdminComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthAdminRoutingModule
  ],
})
export class AuthAdminModule {}
