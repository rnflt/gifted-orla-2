import React, { useEffect } from "react";

import AuthUI, { uiConfig } from "../service/AuthUI";

const LoginUI = () => {
    useEffect( () => {
        AuthUI.start("#firebaseui-auth-container", uiConfig);
      })

    return <div id="firebaseui-auth-container"></div>
};

export default LoginUI;
