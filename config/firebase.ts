import firebase from 'firebase/app';
import 'firebase/firestore';
// import {
//   API_KEY,
//   AUTH_DOMAIN,
//   DATABASE_URL,
//   PROJECT_ID,
//   STORAGE_BUCKET,
//   MESSAGING_SENDER_ID,
//   APP_ID,
// } from 'react-native-dotenv';

// const config = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   databaseURL: DATABASE_URL,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID,
// };

const config = {
  apiKey: 'AIzaSyDFmOQ9QvDc1_ng2gTlaavThZ-JBjIqJb4',
  authDomain: 'drinks-ed68a.firebaseapp.com',
  databaseURL: 'https://drinks-ed68a.firebaseio.com',
  projectId: 'drinks-ed68a',
  storageBucket: 'drinks-ed68a.appspot.com',
  messagingSenderId: '1001490217449',
  appId: '1:1001490217449:web:0fee1c1810374a820db378',
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export default firebase;
