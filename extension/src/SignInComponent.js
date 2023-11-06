import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
//import firebaseConfig from './firebaseConfig'; // Import your Firebase config
import auth from './firebase'; 

const SignInComponent = () => {
 // const auth = getAuth();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Signed in user:', user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div>
      <GoogleOAuthProvider clientId="180864587645-1p198qg0u1kf9u5qja3rucn9rrpukh9a.apps.googleusercontent.com">
        <div>
          <GoogleLogin
            useOneTap
            onSuccess={handleGoogleSignIn}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}

export default SignInComponent;
