import React from "react";
import ReactDOM from "react-dom/client";
import logo from "./logo.svg";
import "./App.css";
import SignInComponent from "./SignInComponent";

// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import axios from 'axios';
// import { useGoogleOneTapLogin } from '@react-oauth/google';

// import { useStore } from './hooks/useStore';
// import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>JOB TRACKER CHROME EXTENSION</p>
        <SignInComponent />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          TRACK JOBS
        </a>
      </header>
    </div>
  );
}
export default App;
