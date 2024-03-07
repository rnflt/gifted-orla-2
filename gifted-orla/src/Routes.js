import { Routes, Route } from "react-router-dom";

import LibraryPage from "./pages/LibraryPage";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/list/:listId" element={<ListPage />} />
    </Routes>
  );
};

export default AppRoutes;
