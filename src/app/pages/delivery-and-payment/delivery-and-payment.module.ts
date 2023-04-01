import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryAndPaymentRoutingModule } from './delivery-and-payment-routing.module';
import { DeliveryAndPaymentComponent } from './delivery-and-payment.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [DeliveryAndPaymentComponent],
  imports: [
    CommonModule,
    DeliveryAndPaymentRoutingModule,
    SharedModule
  ],
})
export class DeliveryAndPaymentModule {}
