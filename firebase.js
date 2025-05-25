//firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAkFRu-4Dy-pdvNG_5qFr6wcbdaYqUxywg",
  authDomain: "student-2b00d.firebaseapp.com",
  projectId: "student-2b00d",
  storageBucket: "student-2b00d.appspot.com",
  messagingSenderId: "817346559091",
  appId: "1:817346559091:web:351b5ff53cd9c873fc3e06",
  measurementId: "G-KBRW8JNE1C"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { auth, db };