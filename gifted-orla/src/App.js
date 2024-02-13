import CssBaseline from "@mui/material/CssBaseline";
import ProductList from "./components/ProductList";
import NavBar from "./components/NavBar";
import { products } from "./data/DummyData";
import * as React from "react";
import ui from "./components/AuthUI";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  EmailAuthProvider,
} from "firebase/auth";

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
        <h1>My Products</h1>
      </header>
      <ProductList products={products} />
      <NavBar />
      <firebaseApp />
      <div id="firebaseui-auth-container"></div>
    </React.Fragment>
  );
}

export default App;
