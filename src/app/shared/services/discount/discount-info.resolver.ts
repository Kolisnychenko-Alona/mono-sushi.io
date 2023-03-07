import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IDiscountResponse } from '../../interfaces/IDiscount';
import { DiscountService } from './discount.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountInfoResolver implements Resolve<IDiscountResponse> {

  constructor( private discountService: DiscountService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDiscountResponse> {
    return this.discountService.getOne(Number(route.paramMap.get('id')));
  }
}
