import firebase from 'firebase';

export class AuthService {
  signin(username, pin){
    return firebase.auth().signInWithEmailAndPassword(username + '@hapkidobrisbane.com.au', pin + '0000');
  }
}