import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { NotificationProvider } from "./contexts/NotificationContext";
import "../src/utils/css/custom.css";
import { UserProvider } from "./contexts/UserContext";

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

// CMS PAGES
import CmsHome from "./cms/cms_home";
import UserManagement from "./cms/pages/UserManagement";
import CategoryManagement from "./cms/pages/CategoryManagement";
import EventManagement from "./cms/pages/EventManagement";
import AppManagement from "./cms/pages/AppManagement";
import InsightsDashboard from "./cms/pages/InsightsDashboard";
import Announcements from "./cms/pages/Announcements";
import Reports from "./cms/pages/Reports";
import UserInterestDetail from "./cms/pages/Interest";

const App = () => {
  // 🔥 Detect subdomain
  const isCMS = window.location.hostname.includes("cms");

  return (
    <AuthProvider>
      <UserProvider>
        <NotificationProvider>
          <Router>
            <Layout className="min-h-screen bg-bg1">
              <Layout.Content>
                <Routes>

                  {/* ================= CMS ROUTES ================= */}
                  {isCMS ? (
                    <>
                      <Route
                        path="/"
                        element={
                          <ProtectedRoute>
                            <CmsHome />
                          </ProtectedRoute>
                        }
                      >
                        <Route index element={<Navigate to="/insights" replace />} />

                        <Route path="insights" element={<InsightsDashboard />} />
                        <Route path="users" element={<UserManagement />} />
                        <Route path="categories" element={<CategoryManagement />} />
                        <Route path="events" element={<EventManagement />} />
                        <Route path="app" element={<AppManagement />} />
                        <Route path="announcements" element={<Announcements />} />
                        <Route path="reports" element={<Reports />} />
                        <Route path="interests" element={<UserInterestDetail />} />
                      </Route>

                      {/* LOGIN */}
                      <Route path="/login" element={<Login />} />
                    </>
                  ) : (
                    /* ================= WEBSITE ROUTES ================= */
                    <>
                      <Route path="/" element={<NearWeLandingPage />} />
                      <Route path="/aboutus" element={<AboutUs />} />
                      <Route path="/services" element={<ServicesPage />} />
                      <Route path="/companyservices" element={<ServicesAgencyPage />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/terms" element={<TermsAndConditions />} />
                      <Route path="/advertise" element={<AdvertiseWithUs />} />
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      <Route path="/child-safety" element={<ChildSafetyPolicy />} />
                    </>
                  )}

                </Routes>
              </Layout.Content>
            </Layout>
          </Router>
        </NotificationProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;