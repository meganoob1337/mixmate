import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA4p6JmnJ6JKGtic_yN_Em7qr3jb6s-H4s",
    authDomain: "mixmate-27592.firebaseapp.com",
    databaseURL: "https://mixmate-27592.firebaseio.com",
})

  const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;

