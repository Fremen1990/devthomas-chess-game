import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyC46NOaKUbBq59hD4mrRsiUK3kycCFH0k0",
    authDomain: "chess-game-devthomas.firebaseapp.com",
    projectId: "chess-game-devthomas",
    storageBucket: "chess-game-devthomas.appspot.com",
    messagingSenderId: "1024816637410",
    appId: "1:1024816637410:web:817315395a7d35afc605bb",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()
export const auth = firebase.auth()
export default firebase