import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAI0SsYKCExiEUbSsBzJ95yrxFFtdoGj3M",
  authDomain: "chromeauthentication-79194.firebaseapp.com",
  projectId: "chromeauthentication-79194",
  storageBucket: "chromeauthentication-79194.appspot.com",
  messagingSenderId: "197432855519",
  appId: "1:197432855519:web:40934fd86992915c7bd26a",
  measurementId: "G-LPN5Y0QQEV"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;