import * as React from "react";
import { Link } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Paper } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function NavBar() {
  const [value, setValue] = React.useState(0);
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
        value={useLocation().pathname}
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
