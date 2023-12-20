import EditResume from "@/pages/edit-resume";
import LandingPage from "@/pages/landing";
import { Routes, 
  BrowserRouter,
  Route } from "react-router-dom";

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/edit-resume" element={<EditResume />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PageRoutes;
