import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc } from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';
import { ICallBackRequest } from '../../interfaces/call/call.interface';

@Injectable({
  providedIn: 'root',
})
export class CallBackService {
  private callBackCollection!: CollectionReference<DocumentData>;

  constructor(private afs: Firestore) {
    this.callBackCollection = collection(this.afs, 'callBack');
  }

  create(order: ICallBackRequest) {
    return addDoc(this.callBackCollection, order);
  }
  
}
