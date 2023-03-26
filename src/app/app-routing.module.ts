import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { DeliveryAndPaymentComponent } from './pages/delivery-and-payment/delivery-and-payment.component';
import { AboutComponent } from './pages/about/about.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductInfoResolver } from './shared/services/product/product-info.resolver';
import { DiscountInfoResolver } from './shared/services/discount/discount-info.resolver';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { AdminGuard } from './shared/guards/auth/admin.guard';
import { UserInformationComponent } from './pages/cabinet/user-information/user-information.component';
import { OrderHistoryComponent } from './pages/cabinet/order-history/order-history.component';
import { ChangePasswordComponent } from './pages/cabinet/change-password/change-password.component';
import { AuthAdminComponent } from './pages/auth-admin/auth-admin.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'discount', component: DiscountComponent },
  {
    path: 'discount/:id',
    component: DiscountInfoComponent,
    resolve: { discountInfo: DiscountInfoResolver },
  },
  { path: 'product/:category', component: ProductComponent },
  {
    path: 'product/:category/:id',
    component: ProductInfoComponent,
    resolve: { productInfo: ProductInfoResolver },
  },
  { path: 'deliveryAndPayment', component: DeliveryAndPaymentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'checkout', component: CheckoutComponent },
  {
    path: 'cabinet',
    component: CabinetComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'userInfo', component: UserInformationComponent },
      { path: 'orderHistory', component: OrderHistoryComponent },
      { path: 'changePassword', component: ChangePasswordComponent },
      { path: '', pathMatch: 'full', redirectTo: 'userInfo' },
    ],
  },
  { path: 'auth-admin', component: AuthAdminComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'category', component: AdminCategoryComponent },
      { path: 'product', component: AdminProductComponent },
      { path: 'discount', component: AdminDiscountComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: '', pathMatch: 'full', redirectTo: 'discount' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
