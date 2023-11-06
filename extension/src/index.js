import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
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
const analytics = getAnalytics(app);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
