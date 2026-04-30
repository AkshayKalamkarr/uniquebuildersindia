import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OurStory from "./pages/Ourstory";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Director from "./components/Director"
import ProjectDetails from "./pages/ProjectDetails";
import OurImpact from './pages/OurImpact'
import { projects } from "./data/projects";

function App() {
  return (
    <Router>

      {/* ✅ HEADER */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/director" element={<Director />} />
        <Route path="/projects/:slug" element={<ProjectDetails />} />
        <Route path="/our-impact" element={<OurImpact />} />
      </Routes>

      {/* ✅ FOOTER */}
      <Footer />
    </Router>
  );
}

export default App;