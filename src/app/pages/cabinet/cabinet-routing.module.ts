import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { UserInformationComponent } from './user-information/user-information.component';

const routes: Routes = [
  {
    path: '',
    component: CabinetComponent,
    children: [
      { path: 'userInfo', component: UserInformationComponent },
      { path: 'orderHistory', component: OrderHistoryComponent },
      { path: 'changePassword', component: ChangePasswordComponent },
      { path: '', pathMatch: 'full', redirectTo: 'userInfo' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CabinetRoutingModule {}
