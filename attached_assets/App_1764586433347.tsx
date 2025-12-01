import { BrowserRouter as Router, Routes, Route } from "react-router";
import Navigation from "@/react-app/components/Navigation";
import Footer from "@/react-app/components/Footer";
import ScrollToTop from "@/react-app/components/ScrollToTop";
import HomePage from "@/react-app/pages/Home";
import AboutPage from "@/react-app/pages/About";
import AcademicsPage from "@/react-app/pages/Academics";
import AdmissionsPage from "@/react-app/pages/Admissions";
import FacilitiesPage from "@/react-app/pages/Facilities";
import GalleryPage from "@/react-app/pages/Gallery";
import ContactPage from "@/react-app/pages/Contact";

export default function App() {
  const basename = import.meta.env.BASE_URL;
  
  return (
    <Router basename={basename}>
      <ScrollToTop />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/academics" element={<AcademicsPage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
