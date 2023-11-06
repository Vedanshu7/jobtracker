import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import { FIREBASE_CONFIG } from "./const";
import reportWebVitals from "./reportWebVitals";

export const firebase = initializeApp(FIREBASE_CONFIG);
export const auth = getAuth(firebase);

export const App = (props) => {
  const [user, setUser] = React.useState(undefined);

  const signIn = (e) => {
    e.preventDefault();

    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError || !token) {
        alert(
          `SSO ended with an error: ${JSON.stringify(chrome.runtime.lastError)}`
        );
        return;
      }

      signInWithCredential(auth, GoogleAuthProvider.credential(null, token))
        .then((res) => {
          console.log("signed in!");
        })
        .catch((err) => {
          alert(`SSO ended with an error: ${err}`);
        });
    });
  };

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user && user.uid ? user : null);
    });
  }, []);

  if (undefined === user) return <h1>Loading...</h1>;

  if (user != null) {
    alert(JSON.stringify(user));
    return (
      <div>
        <h1>Signed in as {user.email}.</h1>
        <button onClick={auth.signOut.bind(auth)}>Sign Out?</button>
      </div>
    );
  } else {
    return <button onClick={signIn}>Sign In with Google</button>;
  }
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
