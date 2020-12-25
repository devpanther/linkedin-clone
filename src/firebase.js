import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDAv8zEe8aPNdw4wiYXTTkJ7r7xLv94-RU",
    authDomain: "linkedin-clone-gt.firebaseapp.com",
    projectId: "linkedin-clone-gt",
    storageBucket: "linkedin-clone-gt.appspot.com",
    messagingSenderId: "651291032406",
    appId: "1:651291032406:web:c71dbbe9f89ec455b574f7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth };