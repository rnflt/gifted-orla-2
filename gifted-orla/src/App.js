import * as React from "react";
import AppRoutes from "./Routes";
import CssBaseline from "@mui/material/CssBaseline";

import NavBar from "./layout/NavBar";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <header className="header">
        <h1>MYAPP</h1>
      </header>
      <AppRoutes />
      <NavBar />
    </React.Fragment>
  );
}

export default App;
