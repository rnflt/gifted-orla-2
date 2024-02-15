import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/NavBar";
import * as React from "react";
import AppRoutes from "./Routes";

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
