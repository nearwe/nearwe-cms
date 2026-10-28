import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "antd";
import { useEffect } from "react";
import { NotificationProvider } from "./contexts/NotificationContext";
import "../src/utils/css/custom.css";

// WEBSITE PAGES
import NearWeLandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import ServicesPage from "./pages/Services";
import ServicesAgencyPage from "./pages/CompanyServices";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AdvertiseWithUs from "./pages/Advertise";
import Contact from "./pages/Contact";
import TermsAndConditions from "./pages/Terms";
import ChildSafetyPolicy from "./pages/Child";
import EmailDrafter from "./pages/EmailDrafter";
import CareersPage from "./pages/Careers";
import VestoraAI from "./pages/VestoraAI";
import VestoraAIDemo from "./pages/VestoraAIDemo";
import NearWeApp from "./pages/NearWeApp";
import Wayyo from "./pages/Wayyo";
import Products from "./pages/Products";
import Portfolio from "./pages/Portfolio";
import RouteMetadata from "./components/RouteMetadata";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (favicon) favicon.href = "/favicon.ico";

    document.title =
      window.location.pathname.replace(/\/+$/, "") === "/wayyo"
        ? "Wayyo | Your Personal AI Automation Tool for Windows"
        : "NearWe";
  }, []);

  return (
    <NotificationProvider>
      <Router>
        <ScrollToTop />
        <RouteMetadata />
        <Layout className="min-h-screen bg-bg1">
          <Layout.Content>
            <Routes>
              <Route path="/" element={<NearWeLandingPage />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/nearwe-app" element={<NearWeApp />} />
              <Route path="/wayyo" element={<Wayyo />} />
              <Route path="/products" element={<Products />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/companyservices" element={<ServicesAgencyPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/advertise" element={<AdvertiseWithUs />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/child-safety" element={<ChildSafetyPolicy />} />
              <Route path="/email-drafter" element={<EmailDrafter />} />
              <Route path="/vestora-ai" element={<VestoraAI />} />
              <Route path="/vestora-ai/demo" element={<VestoraAIDemo />} />
              <Route path="/vestore_ai/demo" element={<VestoraAIDemo />} />
              <Route path="/careers" element={<CareersPage />} />
            </Routes>
          </Layout.Content>
        </Layout>
      </Router>
    </NotificationProvider>
  );
};

export default App;
