import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { DiscountService } from './discount.service';
import { DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DiscountInfoResolver implements Resolve<DocumentData> {
  constructor(private discountService: DiscountService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<DocumentData> {
    return this.discountService.getOne(route.paramMap.get('id') as string);
  }
}
