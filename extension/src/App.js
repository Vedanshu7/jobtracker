import React from "react";
import ReactDOM from "react-dom/client";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>JOB TRACKER CHROME EXTENSION </p>
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
