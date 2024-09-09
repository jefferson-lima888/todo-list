import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDidPoY_ymxvAWIznU1uZ2pSCDEYI04kw8",
  authDomain: "todo-list-bc868.firebaseapp.com",
  projectId: "todo-list-bc868",
  storageBucket: "todo-list-bc868.appspot.com",
  messagingSenderId: "475168597649",
  appId: "1:475168597649:web:1f3365235b00a3378dc130",
  measurementId: "G-9Y697TX3SZ",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db, collection, addDoc, onSnapshot };
