import { auth } from "./AuthProvider";
import "firebaseui/dist/firebaseui.css";
import * as firebaseui from "firebaseui";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  EmailAuthProvider,
} from "firebase/auth";

export const uiConfig = {
  signInSuccessUrl: "<url-to-redirect-to-on-success>",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    GoogleAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
    TwitterAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  signInFlow: "popup",
  tosUrl: "<your-tos-url>",
  // Privacy policy url/callback.
  privacyPolicyUrl: function () {
    window.location.assign("<your-privacy-policy-url>");
  },
};

var AuthUI = new firebaseui.auth.AuthUI(auth);

export default AuthUI;
