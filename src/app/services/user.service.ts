import {Injectable} from '@angular/core';
// @ts-ignore
import {AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database'
import {Observable, of} from 'rxjs';
import {User} from '../interfaces/user'
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private databasePath =  'users';
  usersRef: any;

  constructor(private angularFirestore: AngularFirestore) {
    this.usersRef = angularFirestore.collection<User>(this.databasePath, ref => ref.orderBy('title'))
  }

   getAll(): AngularFirestoreCollection<User> {
     return  this.usersRef;
  }

  createUser(user: User): Promise<void> {
    return this.usersRef.add({...user});
  }

  updateUser(data: any): Promise<void> {
    return this.usersRef.doc(data['id']).update(data);
  }

  delete(docID: string): Promise<void> {
    return this.usersRef.doc(docID).delete();
  }
}
