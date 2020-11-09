import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyD1MeHQhrJ2rvst-wRi8BrJzpJgRZcxLTA",
    authDomain: "contact-manager-a4115.firebaseapp.com",
    databaseURL: "https://contact-manager-a4115.firebaseio.com",
    projectId: "contact-manager-a4115",
    storageBucket: "contact-manager-a4115.appspot.com",
    messagingSenderId: "476460589817",
    appId: "1:476460589817:web:7c8172bdc50d777791f828"
};
  
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();