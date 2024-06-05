// firebase.js
import admin from 'firebase-admin';
import { getStorage } from 'firebase-admin/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAo8FAGRjqj_XFO3rbifluDFBH_Xet6UoE",
  authDomain: "college-c07af.firebaseapp.com",
  projectId: "college-c07af",
  storageBucket: "college-c07af.appspot.com",
  messagingSenderId: "658494760247",
  appId: "1:658494760247:web:f0586adcc7b392d887a6b2",
  measurementId: "G-X5XL4C2ZRE"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: firebaseConfig.storageBucket
});

const bucket = getStorage().bucket();

export default bucket;
