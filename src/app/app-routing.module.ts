import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/guards/auth/auth.guard';
import { AdminGuard } from './shared/guards/auth/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'discount',
    loadChildren: () =>
      import('./pages/discount/discount.module').then((m) => m.DiscountModule),
  },

  {
    path: 'product/:category',
    loadChildren: () =>
      import('./pages/product/product.module').then((m) => m.ProductModule),
  },

  {
    path: 'deliveryAndPayment',
    loadChildren: () =>
      import('./pages/delivery-and-payment/delivery-and-payment.module').then(
        (m) => m.DeliveryAndPaymentModule
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./pages/checkout/checkout.module').then((m) => m.CheckoutModule),
  },
  {
    path: 'cabinet',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/cabinet/cabinet.module').then((m) => m.CabinetModule),
  },
  {
    path: 'auth-admin',
    loadChildren: () =>
      import('./pages/auth-admin/auth-admin.module').then(
        (m) => m.AuthAdminModule
      ),
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
