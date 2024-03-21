import React from "react";
import AppRoutes from "./Routes";
import CssBaseline from "@mui/material/CssBaseline";

import NavBar from "./layout/NavBar";
import Header from "./layout/Header";

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <AppRoutes />
      <NavBar />
    </React.Fragment>
  );
}

export default App;
