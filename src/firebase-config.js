import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBVxN53erVNKoTQzb0Y4z5Sr23xGJPsRMg",
  authDomain: "auth-dev-2c2b5.firebaseapp.com",
  projectId: "auth-dev-2c2b5",
  storageBucket: "auth-dev-2c2b5.appspot.com",
  messagingSenderId: "493455884824",
  appId: "1:493455884824:web:af797df6f6907e1478f96d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore()