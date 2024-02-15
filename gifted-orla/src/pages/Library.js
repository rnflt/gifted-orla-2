import React, { useEffect } from "react";
import { uiConfig } from "../components/AuthUI";
import AuthUI from "../components/AuthUI";

const Library = () => {
  useEffect(() => {
    AuthUI.start("#firebaseui-auth-container", uiConfig);
  });
  return (
    <div>
      <h1>Library</h1>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default Library;
