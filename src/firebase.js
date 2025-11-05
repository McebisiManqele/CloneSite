import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAe5V1GHmyL3bphRJJf4y7Ku3liZqCGhiA",
  authDomain: "bankwebsite-ebb1d.firebaseapp.com",
  projectId: "bankwebsite-ebb1d",
  storageBucket: "bankwebsite-ebb1d.firebasestorage.app",
  messagingSenderId: "551719835697",
  appId: "1:551719835697:web:4443c34eb46c5802475d10",
  measurementId: "G-5V710PPRT8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);