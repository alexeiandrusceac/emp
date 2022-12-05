import {Injectable} from '@angular/core';
import {Observable} from 'rxjs'
import firebase from 'firebase/compat'
import User = firebase.User
import {AngularFireAuth} from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currUser!: Observable<User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    // @ts-ignore
    this.currUser = angularFireAuth.authState;
  }

  signUp(email: string, password: string) {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res: any) => {
        console.log('You are Successfully signed up!', res);
      })
      .catch((error: { message: any; }) => {
        console.log('Something is wrong:', error.message);
      });
  }

  signIn(email: string, password: string) {
    return this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        console.log('You\'re in!');
      })
      .catch(err => {
        console.log(err);
        console.log('Something went wrong:', err.message);
      });
  }

  signOut() {
    localStorage.removeItem('user');
    this.angularFireAuth.signOut();
  }
}
