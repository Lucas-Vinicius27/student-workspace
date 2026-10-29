import * as firebase from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { child, get, getDatabase, onValue, ref, set, update } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

firebase.initializeApp(firebaseConfig);

const auth = getAuth();
const database = getDatabase();

export {
    firebase,
    auth,
    GoogleAuthProvider,
    signInWithPopup,
    database,
    ref,
    set,
    get,
    child,
    update,
    onValue
};
