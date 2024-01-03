import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyAkt2u8Gqt3gphAUvyFtFyTf_opTRNpKuY",
  authDomain: "simple-chat-app-258d5.firebaseapp.com",
  projectId: "simple-chat-app-258d5",
  storageBucket: "simple-chat-app-258d5.appspot.com",
  messagingSenderId: "879124585709",
  appId: "1:879124585709:web:9ad7b3e16614e0ab3680e4",
  measurementId: "G-8ZMQDD8YM9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth };
export default firebase;
