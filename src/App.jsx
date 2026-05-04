import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OurStory from "./pages/Ourstory";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Director from "./components/Director"
import ProjectDetails from "./pages/ProjectDetails";
import OurImpact from './pages/OurImpact'
import { projects } from "./data/projects";
import EnquiryForm from "./pages/EnquiryForm";
import NaviMumbai from "./pages/NaviMumbai";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>

      <ScrollToTop />

      {/* ✅ HEADER */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/director" element={<Director />} />
        <Route path="/projects/:slug" element={<ProjectDetails />} />
        <Route path="/our-impact" element={<OurImpact />} />
        <Route path="/enquiry" element={<EnquiryForm />} />
        <Route path="/navi-mumbai" element={<NaviMumbai />} />
      </Routes>

      {/* ✅ FOOTER */}
      <Footer />
    </Router>
  );
}

export default App;