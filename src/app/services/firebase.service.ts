import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private Firestore: AngularFirestore) {

   }

  cogerUid(){
    var user = ""
    user = firebase.auth().currentUser.uid;
    return user;
  }

  crearEquipo<tipo>(data: tipo, enlace: string) {
    const itemsCollection: AngularFirestoreCollection<tipo> = this.Firestore.collection<tipo>(enlace);
    return itemsCollection.add(data);
  }

  // cargarEquipos(){
  //   const db = firebase.firestore();
  //   const getEquipos = db.collection('users/' + firebase.auth().currentUser.uid + '/equipos/').get().then((snapshot) => {
  //     snapshot.docs.forEach(doc =>
  //       // console.log(doc.data()),
  //       this.homePage.insertarEquipos(doc))
  //   })

  //   // const equiposCollection: AngularFirestoreCollection = this.Firestore.collection('users/' + firebase.auth().currentUser.uid + 'equipos/').doc().get()
  // }

  

}
