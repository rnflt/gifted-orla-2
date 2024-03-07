import { Routes, Route } from "react-router-dom";

import Library from "./pages/Library";
import SearchPage from "./pages/SearchPage";
import Home from "./pages/Home";
import List from "./pages/List";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/library" element={<Library />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/list/:listId" element={<List />} />
    </Routes>
  );
};

export default AppRoutes;
