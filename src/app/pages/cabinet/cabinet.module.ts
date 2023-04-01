import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetComponent } from './cabinet.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { UserInformationComponent } from './user-information/user-information.component';


@NgModule({
  declarations: [
    CabinetComponent,
    ChangePasswordComponent,
    OrderHistoryComponent,
    UserInformationComponent
  ],
  imports: [CommonModule, SharedModule, CabinetRoutingModule],
})
export class CabinetModule {}
