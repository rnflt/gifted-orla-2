import { auth } from "./AuthProvider";
import "firebaseui/dist/firebaseui.css";
import * as firebaseui from "firebaseui";
import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";

export const uiConfig = {
  signInSuccessUrl: window.location.href,
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    GoogleAuthProvider.PROVIDER_ID,
    // TODO FacebookAuthProvider.PROVIDER_ID,
    // TODO: TwitterAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // TODO Terms of service url/callback.
  signInFlow: "popup",
  tosUrl: "<your-tos-url>",
  // Privacy policy url/callback.
  privacyPolicyUrl: function () {
    window.location.assign("<your-privacy-policy-url>");
  },
};

var AuthUI = new firebaseui.auth.AuthUI(auth);

export default AuthUI;
