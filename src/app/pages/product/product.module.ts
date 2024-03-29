import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductComponent } from './product.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';



@NgModule({
  declarations: [
    ProductComponent,
    ProductInfoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
