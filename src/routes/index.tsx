import LandingPage from "@/pages/landing";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default PageRoutes
