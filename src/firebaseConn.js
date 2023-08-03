
import { FirebaseError, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBo-wXBPnC8TYI1FgU9VBwuBSRQjStBcNY",
  authDomain: "ebooksell-9b422.firebaseapp.com",
  databaseURL: "https://ebooksell-9b422-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ebooksell-9b422",
  storageBucket: "ebooksell-9b422.appspot.com",
  messagingSenderId: "621016977758",
  appId: "1:621016977758:web:f35e36ff2232f9b6267fcf",
  measurementId: "G-VZWKTJQ567"
};


const firebaseDB = initializeApp(firebaseConfig);
const auth = getAuth(firebaseDB);
const db = getFirestore(firebaseDB);

export {auth,db};

export default firebaseDB;