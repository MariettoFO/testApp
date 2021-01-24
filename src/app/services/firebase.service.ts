import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private Firestore: AngularFirestore) { }

  crearEquipo<tipo>(data: tipo, enlace: string) {


    const itemsCollection: AngularFirestoreCollection<tipo> = this.Firestore.collection<tipo>(enlace);
    return itemsCollection.add(data);
  }
}
