import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IOrderRequest } from '../../interfaces/order/order.interface';
import { CollectionReference, Firestore, addDoc } from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderCollection!: CollectionReference<DocumentData>;

  public changeBasket = new Subject<boolean>();

  constructor(private afs: Firestore) {
    this.orderCollection = collection(this.afs, 'orders');
  }
  create(order: IOrderRequest) {
    return addDoc(this.orderCollection, order);
  }
}
