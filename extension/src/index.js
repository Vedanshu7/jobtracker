import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import { FIREBASE_CONFIG } from "./const";
import reportWebVitals from "./reportWebVitals";

export var firebase = initializeApp(FIREBASE_CONFIG);
export var auth = getAuth(firebase);

export const App = () => {
  const [user, setUser] = React.useState(undefined);

  const moredetails = () => {
    // Redirect to index.html in the template
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.update(tabs[0].id, {
        url: chrome.runtime.getURL("/ui/index.html"),
      });
    });
  };

  const [loading, setLoading] = React.useState(true);

  const isInIncognitoMode = chrome.extension.inIncognitoContext;

  const signIn = (e) => {
    e.preventDefault();

    // Check if the extension has incognito access
    chrome.extension.isAllowedIncognitoAccess((isAllowedAccess) => {
      if (isAllowedAccess) {
        chrome.identity.getAuthToken(
          { interactive: true, scopes: ["profile", "email"] },
          (token) => {
            if (chrome.runtime.lastError || !token) {
              alert(
                `SSO ended with an error: ${JSON.stringify(
                  chrome.runtime.lastError
                )}`
              );
              return;
            }
            signInWithCredential(
              auth,
              GoogleAuthProvider.credential(null, token)
            )
              .then((res) => {
                alert(JSON.stringify(res));
                console.log("signed in!");
              })
              .catch((err) => {
                alert(`SSO ended with an error: ${err}`);
              });
          }
        );
      } else {
        console.error("Identity API is disabled in incognito windows.");
      }
    });
  };

  const logout = (e) => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        console.error(`Logout error: ${err}`);
      });
  };

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user && user.uid ? user : null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // if (loading) return <h1>Loading...</h1>;

  if (user != null) {
    return (
      <div>
        <h1>Signed in as {user.email}.</h1>
        <button onClick={logout}>Sign Out</button>
      </div>
    );
  } else if (!isInIncognitoMode) {
    // Render the "Sign In" button only if not in incognito mode
    return (
      <div>
        <button onClick={signIn}>Sign In with Google</button>;
        <button onClick={moredetails}> Click for More Details</button>;
      </div>
    );
  } else {
    return <h1>Hello From JobTracker</h1>;
  }
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
