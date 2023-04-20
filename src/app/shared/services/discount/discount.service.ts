import { Injectable } from '@angular/core';
import { IDiscountRequest } from '../../interfaces/IDiscount';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  docData,
  updateDoc,
} from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';


@Injectable({
  providedIn: 'root',
})
export class DiscountService {

  private discountCollection!: CollectionReference<DocumentData>;

  constructor(private afs: Firestore) {
    this.discountCollection = collection(this.afs, 'discounts');
  }

  getAll() {
    return collectionData(this.discountCollection, { idField: 'id' });
  }
  getOne(id: string) {
    const discountDocumentReference = doc(this.afs, `discounts/${id}`);
    return docData(discountDocumentReference, { idField: 'id' });
  }
  create(discount: IDiscountRequest) {
    return addDoc(this.discountCollection, discount);
  }
  update(discount: IDiscountRequest, id: string) {
    const discountDocumentReference = doc(this.afs, `discounts/${id}`);
    return updateDoc(discountDocumentReference, { ...discount });
  }
  delete(id: string) {
    const discountDocumentReference = doc(this.afs, `discounts/${id}`);
    return deleteDoc(discountDocumentReference);
  }
}
