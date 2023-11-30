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
import axios from 'axios';

export var firebase = initializeApp(FIREBASE_CONFIG);
export var auth = getAuth(firebase);

export const App = () => {
  const [user, setUser] = React.useState(undefined);
  const [state, setState] = React.useState(false);

  const moredetails = () => {
    // Redirect to index.html in the template
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.update(tabs[0].id, { url: chrome.runtime.getURL('/ui/index.html') });
    });
  };

  const [loading, setLoading] = React.useState(true);

  const isInIncognitoMode = chrome.extension.inIncognitoContext;

  function transformJson(json) {
    const transformedModel = {
      Id: "00000000-0000-0000-0000-000000000000",
      Uid: json.user.uid,
      Email: json.user.email,
      EmailVerified: json.user.emailVerified,
      IsAnonymous: json.user.isAnonymous,
      PhotoURL: json.user.photoURL,
      ProviderData: json.user.providerData.map((provider) => ({
        Id: "00000000-0000-0000-0000-000000000000",
        ProviderId: provider.providerId,
        Uid: provider.uid,
        DisplayName: provider.displayName,
        Email: provider.email,
        PhoneNumber: provider.phoneNumber,
        PhotoURL: provider.photoURL,
        SingleSignOnId: "00000000-0000-0000-0000-000000000000",
      })),
      RefreshToken: json.user.stsTokenManager.refreshToken,
      AccessToken: json.user.stsTokenManager.accessToken,
      OauthExpireIn: json.user.stsTokenManager.oauthExpireIn,
      ExpiresIn: json.user.stsTokenManager.expiresIn,
      RawUserInfo: json.user.stsTokenManager.rawUserInfo,
      Kind: json.user.stsTokenManager.kind,
      OperationType: json.user.operationType,
      UserId: "00000000-0000-0000-0000-000000000000",
    };

    return transformedModel;
  }

  const signIn = (e) => {
    setLoading(true);
    setState(false);
    e.preventDefault();

    // Check if the extension has incognito access
    chrome.extension.isAllowedIncognitoAccess((isAllowedAccess) => {
      if (isAllowedAccess) {
        chrome.identity.getAuthToken({ interactive: true, scopes: ['profile', 'email'] }, (token) => {
          if (chrome.runtime.lastError || !token) {
            alert(`SSO ended with an error: ${JSON.stringify(chrome.runtime.lastError)}`);
            return;
          }
          signInWithCredential(auth, GoogleAuthProvider.credential(null, token))
            .then(async (res) => {
              try {
                const accessToken = res.user.stsTokenManager.accessToken;
                const apiUrl = 'https://localhost:7100/Auth/';
                const headers = {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
                };

                // Transform user data
                const transformedModel = transformJson(res);


                // Make API call to save user data on the server
                fetch(apiUrl, {
                  method: 'POST',
                  headers: headers,
                  body: JSON.stringify(transformedModel)
                })
                  .then(response => response.json())
                  .then(data => {
                    alert(JSON.stringify(data));
                    // Set the user in the component state
                    localStorage.setItem("user", JSON.stringify(data));
                    localStorage.setItem("access_token", accessToken);

                    setLoading(false);
                    setState(true);
                    alert(JSON.parse(localStorage.getItem("user")).id); 
                  })
                  .catch(error => console.error(error));
              } catch (error) {
                alert(JSON.stringify(error));
                console.error('Error adding data to the database:', error);
              }
              console.log("signed in!");
            })
            .catch((err) => {
              alert(`SSO ended with an error: ${err}`);
            });
        });
      } else {
        console.error('Identity API is disabled in incognito windows.');
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

  if (loading) return <h1>Loading...</h1>;

  if (user != null) {
    return (
      <div>
        <h1>Signed in as {JSON.parse(localStorage.getItem("user")).name}.</h1>
        <button onClick={logout}>Sign Out</button>
      </div>
    );
  } else if (!isInIncognitoMode) {
    // Render the "Sign In" button only if not in incognito mode
    return (
      <div>
        <button onClick={signIn}>Sign In with Google</button>
        <button onClick={moredetails}> Click for More Details</button>
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
