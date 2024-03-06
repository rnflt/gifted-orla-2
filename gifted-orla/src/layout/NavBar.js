import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

export default function NavBar() {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  return (
    <Paper
      sx={{
        width: 500,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <BottomNavigation
        value={value}
        showLabels
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          value="/"
          label="Home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/search"
          value="/search"
          label="Search"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/library"
          value="/library"
          label="Library"
          icon={<LibraryBooksIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
