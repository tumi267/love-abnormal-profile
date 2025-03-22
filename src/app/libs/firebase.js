// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCZjU5XELpdQWhsvdyFeXzwLfF2l-kYgfA",
    authDomain: "npodemo-4afbb.firebaseapp.com",
    projectId: "npodemo-4afbb",
    storageBucket: "npodemo-4afbb.firebasestorage.app",
    messagingSenderId: "1057412173468",
    appId: "1:1057412173468:web:09f1f273030d08efc26759",
    measurementId: "G-6HNVQ1V6GE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };