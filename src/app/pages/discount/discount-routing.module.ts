import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountInfoResolver } from 'src/app/shared/services/discount/discount-info.resolver';
import { DiscountInfoComponent } from './discount-info/discount-info.component';
import { DiscountComponent } from './discount.component';


const routes: Routes = [
  {
    path: '',
    component: DiscountComponent,
  },
  {
    path: ':id',
    component: DiscountInfoComponent,
    resolve: { discountInfo: DiscountInfoResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountRoutingModule {}
