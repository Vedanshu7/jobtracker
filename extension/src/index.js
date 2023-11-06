import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut, // Use signOut instead of auth.signOut
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
      alert(JSON.stringify(auth));
      signInWithCredential(auth, GoogleAuthProvider.credential(null, token))
        .then((res) => {
          console.log("signed in!");
        })
        .catch((err) => {
          alert(`SSO ended with an error: ${err}`);
        });
    });
  };

  const logout = (e) => {
    // Use the signOut function to sign the user out
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        alert(`Logout error: ${err}`);
      });
  };

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user && user.uid ? user : null);
    });
  }, []);

  if (undefined === user) return <h1>Loading...</h1>;

  if (user != null) {
    return (
      <div>
        <h1>Signed in as {user.email}.</h1>
        <button onClick={logout}>Sign Out</button>
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
