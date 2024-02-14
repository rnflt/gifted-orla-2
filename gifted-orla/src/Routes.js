import { Routes, Route } from "react-router-dom";
import Library from "./pages/Library";
import Search from "./pages/search";
import Home from "./pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/library" element={<Library />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
};

export default AppRoutes;
