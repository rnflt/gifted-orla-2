import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/NavBar";
import * as React from "react";
import ui from "./components/AuthUI";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  EmailAuthProvider,
} from "firebase/auth";
import AppRoutes from "./Routes";

const uiConfig = {
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

ui.start("#firebaseui-auth-container", uiConfig);

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <header className="header">
        <h1>MYAPP</h1>
      </header>
      <AppRoutes />
      <firebaseApp />
      <div id="firebaseui-auth-container"></div>
      <NavBar />
    </React.Fragment>
  );
}

export default App;
